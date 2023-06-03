import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./User Components/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to your API
      const response = await axios.post(
        "https://localhost:7020/api/Auth/login",
        {
          email,
          password,
        }
      );

      // Process the response from the API
      console.log("Login Success"); // Log or handle the response as needed
    } catch (error) {
      // Handle any error that occurred during the request
      console.error(error);
    }
  };

  return (
    <div className="Auth-form-container">
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
              type="submit"
              className="btn btn-primary"
              onSubmit={handleSubmit}
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
  );
};

export default LoginPage;
