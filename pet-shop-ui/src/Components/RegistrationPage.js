import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./User Components/LoginPage.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleID, setRole] = useState();
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone || !roleID) {
      toast.error("Please fill in all fields");
      return;
    }

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // Prepare the data to be sent in the request body
      const userData = {
        name: name,
        password: password,
        email: email,
        phone: phone,
        roleID: roleID,
      };
      // Make the POST request using Axios
      const response = await axios.post(
        "https://localhost:7020/api/Auth/Registration",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle the response as needed
      console.log("Registration successfully!", response.data);
      toast.success("Registration successfully!");
      // Reset the form fields after submitting
      setName("");
      setPassword("");
      setEmail("");
      setPhone("");
      setRole();
    } catch (error) {
      // Handle any errors that occurred during the POST request
      console.error("Error adding User:", error);
      toast.error("Please try again!");
    }
  };

  const validateForm = () => {
    let errors = {};

    // Validate email
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required";
    }

    // Validate phone
    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      errors.phone = "Invalid Phone number";
    }

    return errors;
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered? <Link to="/login">LogIn Here.</Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control mt-1 ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                placeholder="Email Address"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Phone</label>
              <input
                type="text"
                className={`form-control mt-1 ${
                  formErrors.phone ? "is-invalid" : ""
                }`}
                placeholder="90909xxxxx"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
               {formErrors.phone && (
                <div className="invalid-feedback">{formErrors.phone}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Role</label>
              <div>
                {/* <label className="mr-3">
                  <input
                    type="radio"
                    name="roleID"
                    value={"1"}
                    checked={roleID === "1"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Admin
                </label>
                <br /> */}
                <label>
                  <input
                    type="radio"
                    name="roleID"
                    value={"2"}
                    checked={roleID === "2"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Customer
                </label>
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                //onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegistrationPage;
