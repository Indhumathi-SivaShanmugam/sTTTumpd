import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import PointsTable from './pages/PointsTable';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-scores" element={<LiveScores />} />
        <Route path="/points-table" element={<PointsTable />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        
        

       
      </Routes>
    </Router>
  );
}

export default App;




