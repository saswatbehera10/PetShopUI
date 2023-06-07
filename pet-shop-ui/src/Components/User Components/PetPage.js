import React, { useEffect, useState } from "react";
import axios from "axios";

const PetPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get("https://localhost:7020/api/Pets");
      console.log(response);
      setPets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (petID) => {
    console.log(`Pet with ID ${petID} added to cart.`);
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Pets available for adoption</h2>
        <br />
        <div className="row">
          {pets.map((pet) => (
            <div key={pet.petID} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p className="card-text">
                    Species: {pet.species}
                    <br />
                    Age: {pet.age} Years
                    <br />
                    Price: ${pet.price}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(pet.petID)}
                  >
                    Adopt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PetPage;
