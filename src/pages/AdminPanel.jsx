import { collection, doc, onSnapshot, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [matches, setMatches] = useState([]);
  const [newMatchId, setNewMatchId] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newMatchData, setNewMatchData] = useState({
    match_id: "",
    team1: "",
    team2: "",
    venue: "",
    date: "",
    status: "Upcoming",
    toss_winner: "",
    toss_decision: "",
    score_team1: "0",
    score_team2: "0",
    wickets_team1: 0,
    wickets_team2: 0,
    overs_team1: 0,
    overs_team2: 0,
    runrate_team1: 0,
    runrate_team2: 0,
    total_overs: 20,
  });

  // Fetch all matches from Firestore and auto-update status
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "matches"), (snapshot) => {
      const currentTime = Timestamp.now();
      const updatedMatches = snapshot.docs.map((doc) => {
        const match = { id: doc.id, ...doc.data() };

        // Auto-update match status to "Live" if timestamp is met
        if (match.status === "Upcoming" && match.date.seconds <= currentTime.seconds) {
          setDoc(doc.ref, { status: "Live" }, { merge: true });
          match.status = "Live";
        }
        return match;
      });

      setMatches(updatedMatches);
    });

    return () => unsubscribe();
  }, []);

  // Update match details
  const updateMatch = async (id, updatedData) => {
    await setDoc(doc(db, "matches", id), updatedData, { merge: true });
  };

  // Add a new match
  const addMatch = async () => {
    if (!newMatchId.trim() || !newMatchData.date.trim()) {
      alert("Match ID and Date cannot be empty!");
      return;
    }

    const matchTimestamp = Timestamp.fromDate(new Date(newMatchData.date));

    await setDoc(doc(db, "matches", newMatchId), {
      ...newMatchData,
      date: matchTimestamp,
    });

    setNewMatchId("");
    setNewMatchData({
      match_id: "",
      team1: "",
      team2: "",
      venue: "",
      date: "",
      status: "Upcoming",
      toss_winner: "",
      toss_decision: "",
      score_team1: "0",
      score_team2: "0",
      wickets_team1: 0,
      wickets_team2: 0,
      overs_team1: 0,
      overs_team2: 0,
      runrate_team1: 0,
      runrate_team2: 0,
      total_overs: 20,
    });
  };

  // Delete a match
  const deleteMatch = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this match?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "matches", id));
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {/* Display Sections */}
      <div>
        <h3>Upcoming Matches</h3>
        {matches.filter((match) => match.status === "Upcoming").length === 0 ? (
          <p>No upcoming matches</p>
        ) : (
          matches
            .filter((match) => match.status === "Upcoming")
            .map((match) => (
              <p key={match.id}>
                {match.team1} vs {match.team2} - {match.venue} ({new Date(match.date.seconds * 1000).toLocaleString()}) 
                <button onClick={() => deleteMatch(match.id)}>🗑️ Delete</button>
              </p>
            ))
        )}

        <h3>Live Matches</h3>
        {matches.filter((match) => match.status === "Live").length === 0 ? (
          <p>No live matches</p>
        ) : (
          matches
            .filter((match) => match.status === "Live")
            .map((match) => (
              <p key={match.id}>
                {match.team1} vs {match.team2} - {match.venue} (Live) 
                <button onClick={() => deleteMatch(match.id)}>🗑️ Delete</button>
              </p>
            ))
        )}
      </div>

      {/* Options: Create Match or Edit Live Match */}
      <div>
        <h3>Create New Match</h3>
        <input type="text" placeholder="Match ID" value={newMatchId} onChange={(e) => setNewMatchId(e.target.value)} />
        <input type="text" placeholder="Team 1" value={newMatchData.team1} onChange={(e) => setNewMatchData({ ...newMatchData, team1: e.target.value })} />
        <input type="text" placeholder="Team 2" value={newMatchData.team2} onChange={(e) => setNewMatchData({ ...newMatchData, team2: e.target.value })} />
        <input type="text" placeholder="Venue" value={newMatchData.venue} onChange={(e) => setNewMatchData({ ...newMatchData, venue: e.target.value })} />
        <input type="datetime-local" value={newMatchData.date} onChange={(e) => setNewMatchData({ ...newMatchData, date: e.target.value })} />
        <input type="number" placeholder="Total Overs" value={newMatchData.total_overs} onChange={(e) => setNewMatchData({ ...newMatchData, total_overs: e.target.value })} />
        <button onClick={addMatch}>Add Match</button>
      </div>

      <div>
        <h3>Select Match to Edit Live Data</h3>
        <select onChange={(e) => setSelectedMatchId(e.target.value)} value={selectedMatchId || ""}>
          <option value="" disabled>Select a match</option>
          {matches
            .filter((match) => match.status === "Live")
            .map((match) => (
              <option key={match.id} value={match.id}>
                {match.team1} vs {match.team2} ({match.venue})
              </option>
            ))}
        </select>
        <button onClick={() => setIsEditing(true)} disabled={!selectedMatchId}>
          Edit Live Scores
        </button>
      </div>

      {/* Edit Live Match Scores */}
      {isEditing && selectedMatchId && (
        <div>
          <h3>Edit Live Match Scores</h3>
          {matches
            .filter((match) => match.id === selectedMatchId)
            .map((match) => (
              <div key={match.id}>
                <h4>{match.team1} vs {match.team2} ({match.venue})</h4>
                <label>Status:</label>
                <select value={match.status} onChange={(e) => updateMatch(match.id, { status: e.target.value })}>
                  <option value="Live">Live</option>
                  <option value="Completed">Completed</option>
                </select>
                <label>Score {match.team1}:</label>
                <input type="number" value={match.score_team1} onChange={(e) => updateMatch(match.id, { score_team1: e.target.value })} />
                <label>Wickets {match.team1}:</label>
                <input type="number" value={match.wickets_team1} onChange={(e) => updateMatch(match.id, { wickets_team1: e.target.value })} />
                <label>Overs {match.team1}:</label>
                <input type="number" value={match.overs_team1} onChange={(e) => updateMatch(match.id, { overs_team1: e.target.value })} />
                <button onClick={() => setIsEditing(false)}>Done Editing</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
