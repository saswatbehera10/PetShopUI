//import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CartPage = ({ setCartItems, cartItems, removeFromCart }) => {
  //const [orderData, setOrderData] = useState("");

  const handleRemoveFromCart = (pet) => {
    removeFromCart(pet);
  };

  const handleCheckout = async () => {
    // Handle checkout logic
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const Order = {
        orderDate: new Date().toISOString(),
        petID: cartItems.length > 0 ? cartItems[0].petID : null,
        userID: userId,
      };

      const response = await axios.post(
        "https://localhost:7020/api/Orders",
        Order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            //"Content-Type": "application/json",
          },
        }
      );
      console.log("Order Created: ", response.data);
      toast.success("Order placed successfully!");
      setCartItems([])
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Error while placing order, please try again!");
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
                <img
                  src={pet.imgUrl}
                  alt={pet.name}
                  style={{ width: "100px", height: "100px" }}
                />
                <br />
                <h5>{pet.name}</h5>
                <p>Species: {pet.species}</p>
                <p>Age: {pet.age} Years</p>
                <p>Price: ${pet.price}</p>

                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(pet)}
                >
                  Remove
                </button>
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
