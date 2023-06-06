import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./User Components/LoginPage.css";
import axios from "axios";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleID, setRole] = useState()

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      // Prepare the data to be sent in the request body  
      const userData = {   
        name: name,   
        password: password, 
        email: email, 
        phone: phone, 
        roleID: roleID,
      }; 
      // Make the POST request using Axios   
      const response = await axios.post("https://localhost:7020/api/Auth/Registration", userData); 
      // Handle the response as needed 
      console.log("Registration successfully!", response.data); 
      // Reset the form fields after submitting   
      setName(""); 
      setPassword(""); 
      setEmail(""); 
      setPhone(""); 
      setRole();
    } catch (error) { 
      // Handle any errors that occurred during the POST request 
      console.error("Error adding User:", error); 
    } 
  };

  return (
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
              className="form-control mt-1"
              placeholder="Email Address"
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
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="90909xxxxx"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group mt-3"> 
            <label>Role</label> 
            <div> 
            <label className="mr-3"> 
              <input 
                type="radio" 
                name="roleID" 
                value={"1"} 
                checked={roleID === "1"} 
                onChange={(e) => setRole(e.target.value)} 
              /> 
              Admin 
            </label> 
            <br />
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
  );
};

export default RegistrationForm;
