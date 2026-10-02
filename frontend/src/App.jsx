import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import EventRegistrationPage from "./pages/EventRegistrationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import AdminEventCreatePage from "./pages/AdminEventCreatePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/join" element={<RegistrationPage />} />
        <Route path="/club-register" element={<RegistrationPage />} />
        <Route path="/events/:eventId" element={<EventRegistrationPage />} />
        <Route path="/events/:eventId/register" element={<EventRegistrationPage />} />
        <Route path="/my-registrations" element={<MyRegistrationsPage />} />
        <Route path="/admin/create-event" element={<AdminEventCreatePage />} />
        <Route path="/admin/events" element={<AdminDashboardPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;