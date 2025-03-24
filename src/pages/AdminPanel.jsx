import { useState, useEffect } from "react";
import { ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [schema, setSchema] = useState({});
  const [newSchema, setNewSchema] = useState("");
  const navigate = useNavigate();

  // Fetch schema from Firebase in real-time
  useEffect(() => {
    const schemaRef = ref(database, "schema");

    const unsubscribe = onValue(schemaRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSchema(data);
        setNewSchema(JSON.stringify(data, null, 2)); // Format JSON nicely
      }
    });

    return () => unsubscribe();
  }, []);

  // Update schema in Firebase
  const handleUpdate = async () => {
    try {
      const parsedSchema = JSON.parse(newSchema);
      await set(ref(database, "schema"), parsedSchema);
      alert("✅ Schema updated successfully!");
    } catch (error) {
      alert("❌ Error updating schema: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ⚙️ Admin Panel - Edit Firebase Schema
      </motion.h2>

      <motion.textarea
        className="w-full max-w-3xl p-3 text-black rounded-md bg-gray-100"
        rows="15"
        value={newSchema}
        onChange={(e) => setNewSchema(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.button
        className="mt-4 bg-green-500 px-6 py-2 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
        onClick={handleUpdate}
        whileHover={{ scale: 1.1 }}
      >
        💾 Update Schema
      </motion.button>

      <button
        className="mt-4 text-red-400 hover:text-red-600"
        onClick={() => navigate("/")}
      >
        🔙 Go Back
      </button>
    </div>
  );
};

export default AdminPanel;

