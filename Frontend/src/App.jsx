import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LoginButton from "./components/LoginButton";
import FileUpload from "./components/Pdf";
import AIAssistant from "./components/AiAssistant";
import Explore from "./components/Explore";
import AboutUsSection from "./components/AboutUs";
import Footer from "./components/Footer";
import FAQ from "./components/Faq.jsx";
import Navbar from "./components/Navbar";
import DoctorDashboard from "./components/DoctorDashboard";
import Dashboard from "./components/Dashboard";
import PatientDashboard from "./components/PatientDashboard";
import PatientRegistration from "./components/PatientRegisteration.jsx";
import DoctorRegistration from "./components/DoctorRegistration.jsx";
import ProfilePage from './components/ProfilePage';
import UserAvatar from "./components/UserAvatar.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

function App() {
  const { isAuthenticated, user, logout } = useAuth0();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setIsLoggedIn(true);
      setUserEmail(user.email);
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  }, [isAuthenticated, user]);

  const handleLogin = (loggedIn, email) => {
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar isLoggedIn={isLoggedIn} userEmail={userEmail} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/2" element={<LoginButton />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/portal" element={<FileUpload />} />
        <Route path="/image-analysis" element={<AIAssistant />} />
        <Route path="/history" element={<AIAssistant />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/doctor-registration" element={<DoctorRegistration />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/UserAvatar" element={<UserAvatar />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
