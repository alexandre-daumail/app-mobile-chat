import '../assets/css/App.css';
import LoginForm from "../components/LoginForm";
import {Route, Routes} from "react-router-dom";
import Panel from "../panel";
import React from "react";

function AppRoutes() {
  return (

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin/panel" element={<Panel />} />
      </Routes>

  );
}

export default AppRoutes;
