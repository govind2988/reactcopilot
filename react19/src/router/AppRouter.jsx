import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home/Home";
import Info from "../components/pages/Info/Info";
import Portal from "../components/pages/Portal/Portal";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
