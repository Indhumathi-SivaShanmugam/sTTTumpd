import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">🏏 Welcome to Stttump’d!</h1>
      <p className="text-lg text-gray-600">Your go-to portal for live cricket scores.</p>
      
      <div className="mt-6 flex gap-4">
        <Link to="/live-scores" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
          View Live Scores
        </Link>
        <Link to="/points-table" className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700">
          View Points Table
        </Link>
      </div>
    </div>
  );
};

export default Home;
