import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const CartPage = ({ setCartItems, cartItems, removeFromCart, clearCart }) => {
  //const [orderData, setOrderData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderID, setorderID] = useState("");

  const handleRemoveFromCart = (pet) => {
    removeFromCart(pet);
    clearCart();
  };

  const handleCheckout = async () => {
    // Handle checkout logic
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const selectedPet = cartItems.length > 0 ? cartItems[0].petID : null;

      const Order = {
        orderDate: new Date().toISOString(),
        petID: selectedPet,
        userID: userId,
      };
      console.log(cartItems[0].name);

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

      // Update the pet's status to "Booked"
      await axios.put(
        `https://localhost:7020/api/Pets/${Order.petID}`,
        {
          name: cartItems[0].name,
          age: cartItems[0].age,
          species: cartItems[0].species,
          price: cartItems[0].price,
          status: "Booked",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order Created: ", response.data);
      toast.success("Order placed successfully!");

      setorderID(response.data.orderID);
      setShowModal(true);

      setCartItems([]);
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Error while placing order, please try again!");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setorderID("");
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your order has been placed successfully. Please note down your order
            ID for future reference.
          </p>
          <p>Order ID: {orderID}</p>
          <p>
            You will soon receive an email for the meet and greet session and
            exchanging of the pet.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default CartPage;
