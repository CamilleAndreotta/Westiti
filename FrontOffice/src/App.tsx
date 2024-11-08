import { Route, BrowserRouter, Routes } from "react-router-dom";
import AOS from "aos";

import Homepage from "./Pages/Homepage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import EventsPage from "./Pages/EventsPage";
import Profile from "./Pages/Profile";

import "aos/dist/aos.css";
import "./styles/app.css";

const App = () => {
  AOS.init();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
