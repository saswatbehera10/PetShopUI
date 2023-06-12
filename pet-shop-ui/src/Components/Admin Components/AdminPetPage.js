import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./AdminPetPage.css";
import { AdminNavbar } from "./AdminNavbar";

const AdminPetPage = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [updatedPetData, setUpdatedPetData] = useState({
    name: "",
    species: "",
    age: "",
    price: "",
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7020/api/pets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const deletePet = async (petId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7020/api/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Pet deleted successfully!");
      fetchPets(); // Refresh the pet list after deleting
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Please try again!");
    }
  };

  const openUpdateWindow = (pet) => {
    setSelectedPet(pet);
    setUpdatedPetData({
      name: pet.name,
      species: pet.species,
      age: pet.age,
      price: pet.price,
    });
  };

  const closeUpdateWindow = () => {
    setSelectedPet(null);
    setUpdatedPetData({
      name: "",
      species: "",
      age: "",
      price: "",
    });
  };

  const updatePet = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://localhost:7020/api/pets/${selectedPet.petID}`,
        updatedPetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Pet updated successfully!");
      fetchPets(); // Refresh the pet list after updating
      closeUpdateWindow(); // Close the update window/modal
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Please try again!");
    }
  };

  const handleInputChange = (e) => {
    setUpdatedPetData({
      ...updatedPetData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <br />
        <h2>Pet Details</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Pet ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Age</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={pet.petID}>
                <td>{index + 1}</td>
                <td>{pet.petID}</td>
                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td>{pet.age}</td>
                <td>{pet.price}</td>
                <td>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => deletePet(pet.petID)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => openUpdateWindow(pet)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPet && (
          <div className="update-pet-modal">
            <div className="update-pet-modal-content">
              <h3>Update Pet</h3>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedPetData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Species:</label>
                  <input
                    type="text"
                    name="species"
                    value={updatedPetData.species}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={updatedPetData.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="text"
                    name="price"
                    value={updatedPetData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updatePet}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeUpdateWindow}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminPetPage;
