import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import Calendar from './pages/Calendar/Calendar';
import SubmitEvent from './pages/AddEvent/SubmitEvent';
import Admin from './pages/Admin/Admin';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/coming-soon" element={<ComingSoon />} />

      {/* Guest-only: redirect to /calendar if already logged in */}
      <Route path="/login"  element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

      {/* Protected: must be logged in */}
      <Route path="/calendar"     element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/submit-event" element={<ProtectedRoute><SubmitEvent /></ProtectedRoute>} />

      {/* Admin only */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} />
    </Routes>
  );
}


