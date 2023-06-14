import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7020/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      const { token, expirationMinutes, role, userId } = response.data;

      // Store the token, expiration, and role ID in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("expirationMinutes", expirationMinutes);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // Redirect based on role ID
      if (role === 1) {
        navigate("/admin/home");
      } else if (role === 2) {
        navigate("/home");
      } else {
        // Handle unknown role ID
        navigate("/login"); // Redirect to login page
      }
      toast.success("Login Success!");

    } catch (error) {
      // Handle login error
      console.log("Login failed", error);
    }
  };

  const checkTokenExpiration = () => {
    const expirationMinutes = localStorage.getItem("expirationMinutes");

    if (expirationMinutes) {
      const now = new Date();
      const expirationDate = new Date(expirationMinutes);

      if (now > expirationDate) {
        // Token has expired, perform logout or refresh token logic
        // ...
        // For example, you can clear the token, expiration, and role ID from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("expirationMinutes");
        localStorage.removeItem("role");
        navigate("/login"); // Redirect to login page
      } else {
        // Token is still valid
        const role = localStorage.getItem("role");

        // Redirect based on role ID
        if (role === 1) {
          navigate("/admin/home");
        } else if (role === 2) {
          navigate("/home");
        } else {
          // Handle unknown role ID
          navigate("/login"); // Redirect to login page
        }
      }
    } else {
      // No token or expiration found, user is not logged in
      navigate("/login"); // Redirect to login page
    }
  };

  // Check token expiration on component mount
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <>
      <div className="Auth-form-container">
        <h1
          className="Auth-form-title"
          style={{ fontSize: "80px", color: "#ffffff" }}
        >
          Hi, there!
        </h1>{" "}
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Submit
              </button>
            </div>
            <p className="not-a-member-signup text-right mt-2">
              Not a member? <Link to="/register">Register Here.</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
