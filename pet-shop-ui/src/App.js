import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationPage from "./Components/RegistrationPage";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/User Components/HomePage";
import CartPage from "./Components/User Components/CartPage";
import AdminHomePage from "./Components/Admin Components/AdminHomePage";
import AdminOrderPage from "./Components/Admin Components/AdminOrderPage";
import AdminPetPage from "./Components/Admin Components/AdminPetPage";
import AdminUserPage from "./Components/Admin Components/AdminUserPage";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (pet) => {
    if (cartItems.length === 1) {
      toast.error("Your cart is already full. Please checkout first.");
    } else {
      setCartItems([...cartItems, pet]);
      toast.success("Added to cart!");
    }
  };

  const removeFromCart = (pet) => {
    setCartItems([cartItems.filter((item) => item.petID !== pet.petID)]);
  };

  const clearCart = () => {
    setCartItems([]);
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <CartPage cartItems={cartItems} removeFromCart={removeFromCart} setCartItems={setCartItems} clearCart={clearCart} />
            }
          />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/orders" element={<AdminOrderPage />} />
          <Route path="/admin/pets" element={<AdminPetPage />} />
          <Route path="/admin/users" element={<AdminUserPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
