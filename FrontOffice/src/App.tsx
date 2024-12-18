import { Route, BrowserRouter, Routes } from "react-router-dom";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import Homepage from "./Pages/Homepage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Event from "./Pages/Event";
import Contact from "./Pages/Contact";

import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";

const App = () => {
  AOS.init();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound/>}/>    
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
