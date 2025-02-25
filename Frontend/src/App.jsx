import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Route
import HomePage from './components/HomePage';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import LoginButton from "./components/LoginButton";
import FileUpload from "./components/Pdf"
// import Appointment from './components/Appointment';
// import KneeDiseasePrediction from './components/predictions/Knee';
// import BrainDiseasePrediction from './components/predictions/brain';
// import ChestDiseasePrediction from './components/predictions/chest';
// import HeartDiseasePrediction from './components/predictions/heart';
// import Sally from './components/chatbots/sally';
// import BayMac from './components/chatbots/baymac';
// import RatingsPage from './components/Rating';

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

      <Routes>

        <Route path='/' element={<HomePage/>} />
        <Route path='/2' element={<LoginButton/>} />
        <Route path='/portal' element={<FileUpload/>} />

        {/* <Route path='/appointments' element={<Appointment/>} />
        <Route path='/knee' element={<KneeDiseasePrediction/>}/>
        <Route path='/brain' element={<BrainDiseasePrediction/>}/>
        <Route path='/chest' element={<ChestDiseasePrediction/>}/>
        <Route path='/heart' element={<HeartDiseasePrediction/>}/>
        <Route path='/sally' element={<Sally/>}/>
        <Route path='/baymac' element={<BayMac/>}/>
        <Route path = '/ratings' element = {<RatingsPage/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;  