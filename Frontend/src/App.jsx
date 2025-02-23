
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Route
import HomePage from './components/HomePage';
// import Appointment from './components/Appointment';
// import KneeDiseasePrediction from './components/predictions/Knee';
// import BrainDiseasePrediction from './components/predictions/brain';
// import ChestDiseasePrediction from './components/predictions/chest';
// import HeartDiseasePrediction from './components/predictions/heart';
// import Sally from './components/chatbots/sally';
// import BayMac from './components/chatbots/baymac';
// import RatingsPage from './components/Rating';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<HomePage/>} />
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