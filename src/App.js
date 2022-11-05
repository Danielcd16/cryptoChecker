import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoinInfo } from "./Routes/CoinInfo";
import { Main } from "./Routes/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/CoinInfo/:id" element={<CoinInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
