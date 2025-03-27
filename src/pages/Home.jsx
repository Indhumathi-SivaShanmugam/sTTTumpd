import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesCollection = collection(db, "matches");
        const matchesSnapshot = await getDocs(matchesCollection);
        const matchesList = matchesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setLiveMatches(matchesList.filter((match) => match.status === "Live"));
        setUpcomingMatches(matchesList.filter((match) => match.status === "Upcoming"));
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🏏 Welcome to sTTTump'd!
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Your go-to portal for live cricket scores.
      </motion.p>

      {/* Live Matches Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-400">🏆 Live Matches</h2>
        {loading ? (
          <p className="text-gray-400">Loading matches...</p>
        ) : liveMatches.length > 0 ? (
          <motion.div
            className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {liveMatches.map((match) => (
              <div key={match.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-white font-bold">
                  {match.team1} 🆚 {match.team2} {match.status}
                </p>
                
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-400">No live matches currently.</p>
        )}
      </div>

      {/* Upcoming Matches Section */}
      <div className="w-full max-w-3xl bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-400">⏳ Upcoming Matches</h2>
        {loading ? (
          <p className="text-gray-400">Loading matches...</p>
        ) : upcomingMatches.length > 0 ? (
          <motion.div
            className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-white font-bold">
                  {match.team1} 🆚 {match.team2} {match.status}
                </p>
                
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-400">No upcoming matches scheduled.</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex gap-10 mt-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Link
          to="/live-scores"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 transition-transform transform hover:scale-105"
        >
          View Live Scores
        </Link>

        <Link
          to="/points-table"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 transition-transform transform hover:scale-105"
        >
          View Points Table
        </Link>

        <Link
          to="/admin-login"
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 transition-transform transform hover:scale-105"
        >
          Admin Login
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
