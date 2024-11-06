import { Route, BrowserRouter, Routes } from "react-router-dom";



import Homepage from "./Pages/Homepage";

import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />} />  */}
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
