import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import Navbar from "./components/Navbar"; // Import Navbar
import DoctorDashboard from "./components/DoctorDashboard";
import Dashboard from "./components/Dashboard";
import PatientDashboard from "./components/PatientDashboard";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const firstTimeUser = localStorage.getItem(`firstTime_${user.sub}`);
      if (!firstTimeUser) {
        setIsFirstTime(true);
        localStorage.setItem(`firstTime_${user.sub}`, "false");
      }
    }
  }, [isAuthenticated, user]);

  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
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
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
