import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Currencies from "./components/Currencies";
import CurrenciesDisplay from "./components/CurrenciesDisplay";
import Exchanges from "./components/Exchanges";

const App = () => {
  return (
    <Box bgcolor="primary.main" className="main-container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/crypto" element={<Currencies />}></Route>
          <Route path="/crypto/:id" element={<CurrenciesDisplay />}></Route>
          <Route path="/exchanges" element={<Exchanges />}></Route>

          {/* This should be the last route */}
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
