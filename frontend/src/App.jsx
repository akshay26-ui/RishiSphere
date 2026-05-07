// /src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import AdminOverview from "./pages/AdminOverview";
import CalendarPage from "./pages/CalendarPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SubmitEventPage from "./pages/SubmitEventPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/admin" element={<AdminOverview />} />
      <Route path="/submit-event" element={<SubmitEventPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
