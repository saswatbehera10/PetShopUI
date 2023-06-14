import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AdminNavbar } from "./AdminNavbar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7020/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = (orderId) => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure you want to delete this order?",
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(orderId),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const confirmDelete = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7020/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order deleted successfully!");
      fetchOrders(); // Refresh the order list after deleting
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Please try again!");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <br />
        <h2>All Orders</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Pet ID</th>
              <th>Pet Name</th>
              <th>UserName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderID}>
                <td>{index + 1}</td>
                <td>{order.orderID}</td>
                <td>{order.orderDate}</td>
                <td>{order.petID}</td>
                <td>{order.pet.name}</td>
                <td>{order.user.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteOrder(order.orderID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminOrderPage;
