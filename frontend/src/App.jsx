import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import Calendar from './pages/Calendar/Calendar';
import SubmitEvent from './pages/AddEvent/SubmitEvent';
import Admin from './pages/Admin/Admin';
import ComingSoon from './pages/ComingSoon/ComingSoon';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/submit-event" element={<SubmitEvent />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
    </Routes>
  );
}
