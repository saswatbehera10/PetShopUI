import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./Components/RegistrationPage";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/User Components/Navbar";
import HomePage from "./Components/User Components/HomePage";
import PetPage from "./Components/User Components/PetPage";
import "./Components/User Components/LoginPage.css";
import AdminHomePage from "./Components/Admin Components/AdminHomePage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <HomePage />
        <PetPage />
        <AdminHomePage />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
