import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CartPage = ({ cartItems, removeFromCart }) => {
  const handleCheckout = async () => {
    // Handle checkout logic
    try {
      const order = {
        orderDate: new Date().toISOString,
        petID: cartItems.map((pet) => pet.petID),
        userID: 3,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://localhost:7020/api/Orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order Created: ", response.data);
      toast.success("Order placed successfully!")
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Error while placing error, please try again!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((pet) => (
              <div key={pet.petID}>
                <h5>{pet.name}</h5>
                <p>Species: {pet.species}</p>
                <p>Age: {pet.age} Years</p>
                <p>Price: ${pet.price}</p>
                <hr />
              </div>
            ))}
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CartPage;
