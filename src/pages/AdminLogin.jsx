import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminPassword = "admin123"; // Change this later for security
    if (password === adminPassword) {
      localStorage.setItem("isAdmin", "true"); // Keep admin logged in
      navigate("/admin-panel");
    } else {
      setError("Incorrect password. Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        className="p-2 text-black rounded-md mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AdminLogin;