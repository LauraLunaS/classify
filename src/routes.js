import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Solicitation from "./pages/Solicitation/solicitation"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Solicitation />} path="/solicitation" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
