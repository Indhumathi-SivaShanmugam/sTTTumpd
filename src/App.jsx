import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import PointsTable from './pages/PointsTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-scores" element={<LiveScores />} />
        <Route path="/points-table" element={<PointsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
