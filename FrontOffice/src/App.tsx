import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./Pages/Homepage";

import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
