import React, { useState, useEffect } from "react";
import BaseRouter from "./routes";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <BaseRouter />
    </Router>
  );
}

export default App;
