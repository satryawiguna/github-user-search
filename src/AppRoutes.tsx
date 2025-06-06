import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);
