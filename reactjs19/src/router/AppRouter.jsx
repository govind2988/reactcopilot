import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/pages/home/Home";
import Info from "../components/pages/info/Info";
import Portal from "../components/pages/portal/Portal";
import HomeLayout from "../components/common/home/HomeLayout";
import InfoLayout from "../components/common/home/InfoLayout";
import ListPage from "../components/pages/home/ListPage";
import Projects from "../components/pages/home/projects.jsx";
import Category from "../components/pages/category/Category";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Info />} />
          <Route path="/listpage" element={<ListPage />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/category/:categoryId" element={<Category />} />
        </Route>

        <Route element={<InfoLayout />}>
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
