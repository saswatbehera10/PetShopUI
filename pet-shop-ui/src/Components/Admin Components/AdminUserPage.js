import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AdminNavbar } from "./AdminNavbar";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7020/api/Users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userID) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7020/api/Users/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Deleted!");
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Please try again!");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <br />
        <h2>All Users</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userID}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.roleID}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.userID)}
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

export default AdminUserPage;
