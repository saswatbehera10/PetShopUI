import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./Components/RegistrationPage";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/User Components/Navbar";
import HomePage from "./Components/User Components/HomePage";
import PetPage from "./Components/User Components/PetPage";
import "./Components/User Components/LoginPage.css";
import AdminHomePage from "./Components/Admin Components/AdminHomePage";
import AdminOrderPage from "./Components/Admin Components/AdminOrderPage";
import AdminPetPage from "./Components/Admin Components/AdminPetPage";
import AdminNavbar from "./Components/Admin Components/AdminNavbar";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <AdminNavbar />
        <HomePage />
        <PetPage />
        <AdminHomePage />
        <AdminOrderPage />
        <AdminPetPage />
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
