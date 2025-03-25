import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white">
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

      <motion.div
        className="flex gap-6"
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
