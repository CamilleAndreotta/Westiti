import { Route, BrowserRouter, Routes } from "react-router-dom";
import AOS from "aos";

import Homepage from "./Pages/Homepage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

import 'aos/dist/aos.css'; 
import "./styles/app.css";

const App = () => {
 AOS.init();
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
