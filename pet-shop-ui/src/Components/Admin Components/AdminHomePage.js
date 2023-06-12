import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../User Components/LoginPage.css";
import { AdminNavbar } from "./AdminNavbar";

const AdminHomePage = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log("Image URL:", imageUrl);
  }, [imageUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setImageUrl(imageDataUrl);
      setUrl(imageDataUrl);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // Prepare the data to be sent in the request body
      const petData = {
        name: name,
        species: species,
        age: age,
        price: price,
        imgUrl: url,
      };
      // Make the POST request using Axios
      const response = await axios.post(
        "https://localhost:7020/api/Pets",
        petData,
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
      // Handle the response as needed
      console.log("Pet added successfully!", response.data);

      toast.success("Pet added successfully!");
      // Reset the form fields after submitting
      setName("");
      setSpecies("");
      setAge("");
      setPrice("");
      setUrl();
    } catch (error) {
      // Handle any errors that occurred during the POST request
      console.error("Error adding pet:", error);
      toast.error("Please try again!");
    }
  };

  return (
    <>
      <AdminNavbar />
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
            <div className="form-group mt-3">
              <label>Image:</label>
              {/* <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control mt-1"
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
      <ToastContainer />
    </>
  );
};

export default AdminHomePage;
