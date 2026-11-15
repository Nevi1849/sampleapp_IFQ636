import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { user} = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/profile" 
          element={ user ? <Profile /> : <Navigate to="/login" replace />} 
        />
        <Route 
        path="/tasks"
        element={user ? <Tasks /> : <Navigate to="/login" replace />}
      />
      </Routes>
    </Router>
  );
}

export default App;
