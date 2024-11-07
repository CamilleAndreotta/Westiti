import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Signin from "./Pages/Signin";

import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
