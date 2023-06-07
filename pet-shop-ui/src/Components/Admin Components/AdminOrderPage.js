import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminNavbar } from "./AdminNavbar";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7020/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://localhost:7020/api/orders/${orderId}`);
      console.log("Order Deleted!"); // Log or handle the response as needed
      fetchOrders(); // Refresh the order list after deleting
    } catch (error) {
      console.error("Error deleting order:", error);
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
    </>
  );
};

export default AdminOrderPage;
