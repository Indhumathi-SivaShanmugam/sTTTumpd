import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure correct import

const AdminPanel = () => {
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      alert("🚫 Unauthorized access! Redirecting to home.");
      navigate("/");
      return;
    }

    const matchDocRef = doc(db, "matches", "match_SNUvsSSN");
    const unsubscribe = onSnapshot(
      matchDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMatchData(data);
          setEditableData(data); // Initialize editable fields
        } else {
          setMatchData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching match data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  // Handle input changes
  const handleInputChange = (key, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Update Firestore
  const handleSaveChanges = async () => {
    try {
      const matchDocRef = doc(db, "matches", "match_SNUvsSSN");
      await updateDoc(matchDocRef, editableData);
      alert("✅ Match data updated successfully!");
    } catch (error) {
      console.error("Error updating match data:", error);
      alert("❌ Failed to update match data.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">⚙️ Admin Panel</h2>

      {loading ? (
        <p className="text-gray-400">Loading match data...</p>
      ) : matchData ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-left w-full max-w-lg">
          {Object.entries(editableData).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label className="block font-semibold text-sm">{key}:</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}
          <button
            className="mt-4 bg-green-500 px-6 py-2 rounded-lg hover:bg-green-700 transition-all w-full"
            onClick={handleSaveChanges}
          >
            💾 Save Changes
          </button>
        </div>
      ) : (
        <p className="text-red-400">No match data available.</p>
      )}

      <button
        className="mt-4 bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        onClick={() => navigate("/")}
      >
        🔙 Go Back to Home
      </button>

      <button
        className="mt-4 bg-red-500 px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/admin-login");
        }}
      >
        🔓 Logout
      </button>
    </div>
  );
};

export default AdminPanel;
