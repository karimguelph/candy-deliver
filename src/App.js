
// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CandySelector from "./components/CandySelector";
import MapSelector from "./components/MapSelector";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/candy" element={<CandySelector />} />
        <Route path="/map" element={<MapSelector />} />


      </Routes>
    </Router>
  );
}

export default App;