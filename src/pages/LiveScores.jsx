import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaBaseballBall } from "react-icons/fa";

const LiveScores = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    const matchDocRef = doc(db, "matches", "match_SNUvsSSN");

    const unsubscribe = onSnapshot(
      matchDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setMatchData(docSnap.data());
          setOfflineMode(false); // Reset offline mode if data is received
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

    // Function to fetch cached data when offline
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
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading live match data...</p>;
  }

  if (!matchData) {
    return <p className="text-center text-red-500">No live match data available.</p>;
  }

  const {
    team1,
    team2,
    score_team1,
    score_team2,
    wickets_team1,
    wickets_team2,
    overs_team1,
    overs_team2,
    runrate_team1,
    runrate_team2,
    toss_winner,
    toss_decision,
    status,
  } = matchData;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-blue-900 to-black text-white rounded-lg shadow-lg animate-fadeIn">
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

      <p className="text-lg font-semibold text-center text-gray-300">{team1} vs {team2}</p>
      <p className="text-center text-yellow-400 font-bold">Status: {status}</p>
      <p className="text-center text-gray-300 mt-2">Toss: {toss_winner} won the toss and chose to {toss_decision}</p>

      <div className="mt-6">
        <p className="font-bold text-lg text-blue-400">{team1} Batting</p>
        <motion.p
          className="text-3xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {score_team1}/{wickets_team1} ({overs_team1} ov)
        </motion.p>
        <p className="text-gray-300">Run Rate: {runrate_team1}</p>
      </div>

      <div className="mt-6">
        <p className="font-bold text-lg text-red-400">{team2} Bowling</p>
        <p className="text-3xl font-bold">{score_team2}/{wickets_team2} ({overs_team2} ov)</p>
        <p className="text-gray-300">Run Rate: {runrate_team2}</p>
      </div>
    </div>
  );
};

export default LiveScores;
