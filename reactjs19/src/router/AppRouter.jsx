import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/pages/home/Home";
import Info from "../components/pages/info/Info";
import Portal from "../components/pages/portal/Portal";
import HomeLayout from "../components/common/home/HomeLayout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/portal" element={<Portal />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
