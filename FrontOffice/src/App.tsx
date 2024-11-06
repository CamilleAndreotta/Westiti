import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
