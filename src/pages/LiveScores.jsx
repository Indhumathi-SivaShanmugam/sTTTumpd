import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { doc, onSnapshot, getDoc, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaBaseballBall } from "react-icons/fa";

const LiveScores = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      const matchesCollection = collection(db, "matches");
      const matchesSnapshot = await getDocs(matchesCollection);
      const liveMatches = [];
      matchesSnapshot.forEach((doc) => {
        if (doc.data().status === "Live") {
          liveMatches.push({ id: doc.id, ...doc.data() });
        }
      });
      setMatches(liveMatches);
    };
    fetchLiveMatches();
  }, []);

  useEffect(() => {
    if (!selectedMatch) return;
    const matchDocRef = doc(db, "matches", selectedMatch);

    const unsubscribe = onSnapshot(
      matchDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setMatchData(docSnap.data());
          setOfflineMode(false);
        } else {
          setMatchData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setOfflineMode(true);
        fetchCachedData();
      }
    );

    const fetchCachedData = async () => {
      try {
        const cachedDoc = await getDoc(matchDocRef);
        if (cachedDoc.exists()) {
          setMatchData(cachedDoc.data());
        }
      } catch (err) {
        console.error("Error fetching cached data:", err);
      }
      setLoading(false);
    };

    return () => unsubscribe();
  }, [selectedMatch]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-blue-900 to-black text-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-center mb-4">Select Match to View Live Data</h2>
      <select
        className="w-full p-2 text-black rounded-md mb-4"
        value={selectedMatch}
        onChange={(e) => setSelectedMatch(e.target.value)}
      >
        <option value="">Select a live match</option>
        {matches.map((match) => (
          <option key={match.id} value={match.id}>
            {match.team1} vs {match.team2}
          </option>
        ))}
      </select>

      {loading && selectedMatch && <p className="text-center text-gray-500">Loading live match data...</p>}

      {selectedMatch && matchData && (
        <>
          <motion.h2
            className="text-2xl font-bold text-center flex items-center justify-center gap-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <FaBaseballBall /> Live Cricket Match
          </motion.h2>

          {offlineMode && (
            <p className="text-center text-yellow-400 font-semibold">
              ⚠️ You are offline. Displaying last cached data.
            </p>
          )}

          <p className="text-lg font-semibold text-center text-gray-300">
            {matchData.team1} vs {matchData.team2}
          </p>
          <p className="text-center text-yellow-400 font-bold">Status: {matchData.status}</p>
          <p className="text-center text-gray-300 mt-2">
            Toss: {matchData.toss_winner} won the toss and chose to {matchData.toss_decision}
          </p>

          <div className="mt-6">
            <p className="font-bold text-lg text-blue-400">{matchData.team1} Batting</p>
            <motion.p
              className="text-3xl font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {matchData.score_team1}/{matchData.wickets_team1} ({matchData.overs_team1} ov)
            </motion.p>
            <p className="text-gray-300">Run Rate: {matchData.runrate_team1}</p>
          </div>

          <div className="mt-6">
            <p className="font-bold text-lg text-red-400">{matchData.team2} Bowling</p>
            <p className="text-3xl font-bold">
              {matchData.score_team2}/{matchData.wickets_team2} ({matchData.overs_team2} ov)
            </p>
            <p className="text-gray-300">Run Rate: {matchData.runrate_team2}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveScores;
