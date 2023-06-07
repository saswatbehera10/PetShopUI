import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CartPage = () => {
  const [pets, setPets] = useState([]);
  const [orderID, setOrderID] = useState(null);

  const handleCheckout = async () => {
    // Perform the checkout process here
    // You can update the pets array and generate an order number

    // Assuming the checkout is successful
    try {
      const response = await axios.post(
        "https://localhost:7020/api/Orders",
        pets
      );
      const { orderID } = response.data;
      setPets([]);
      setOrderID(orderID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Cart</h2>
        {pets.length === 0 ? (
          <p>No pets in the cart.</p>
        ) : (
          <>
            <h4>Pets to Adopt:</h4>
            <ul>
              {pets.map((pet) => (
                <li key={pet.petID}>{pet.name}</li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        )}
        {orderID && (
          <div className="mt-3">
            <h5>Sit back and relax!</h5>
            <p>
              Your pet is on its way. You'll soon receive an email. Please note
              down your order number for future reference:
            </p>
            <h4>{orderID}</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
