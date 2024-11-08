import { Route, BrowserRouter, Routes } from "react-router-dom";
import AOS from "aos";
import { ToastContainer} from "react-toastify";
import Homepage from "./Pages/Homepage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import EventsPage from "./Pages/EventsPage";
import Profile from "./Pages/Profile";

import "aos/dist/aos.css";
import "./styles/app.css";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  AOS.init();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
};

export default App;
