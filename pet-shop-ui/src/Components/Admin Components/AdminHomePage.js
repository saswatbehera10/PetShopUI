import React, { useState } from "react"; 
import axios from "axios";
import "../User Components/LoginPage.css";


const AdminHomePage = () => { 
  const [name, setName] = useState(""); 
  const [species, setSpecies] = useState(""); 
  const [age, setAge] = useState(""); 
  const [price, setPrice] = useState(""); 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      // Prepare the data to be sent in the request body  
      const petData = {   
        name: name,   
        species: species, 
        age: age, 
        price: price, 
      }; 
      // Make the POST request using Axios   
      const response = await axios.post("https://localhost:7020/api/Pets", petData); 
      // Handle the response as needed 
      console.log("Pet added successfully!", response.data); 
      // Reset the form fields after submitting   
      setName(""); 
      setSpecies(""); 
      setAge(""); 
      setPrice(""); 
    } catch (error) { 
      // Handle any errors that occurred during the POST request 
      console.error("Error adding pet:", error); 
    } 
  };

  return ( 
    <div className="Auth-form-container"> 
    <form onSubmit={handleSubmit} className="Auth-form"> 
        <div className="Auth-form-content"> 
                <h3 className="Auth-form-title">Pet Listing Form</h3>
                <div className="form-group mt-3"> 
                <label>Pet Name:</label> 
                <input 
                type="text" 
                className="form-control mt-1" 
                placeholder="Enter name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                /> 
            </div> 
            <div className="form-group mt-3"> 
                <label>Species:</label> 
                <input 
                type="text" 
                className="form-control mt-1" 
                placeholder="Enter species" 
                value={species} 
                onChange={(e) => setSpecies(e.target.value)} 
                /> 
            </div> 
            <div className="form-group mt-3"> 
                <label>Age:</label>
                <input 
                type="number" 
                className="form-control mt-1" 
                placeholder="Enter age" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                /> 
            </div> 
            <div className="form-group mt-3"> 
                <label>Price:</label> 
                <input 
                type="number" 
                className="form-control mt-1" 
                placeholder="Enter price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                /> 
            </div> 
            <div className="d-grid gap-2 mt-3"> 
                <button type="submit" className="btn btn-primary"> 
                Add Pet 
                </button> 
            </div> 
        </div>
        </form> 
    </div> 
  ); 
}; 


export default AdminHomePage; 