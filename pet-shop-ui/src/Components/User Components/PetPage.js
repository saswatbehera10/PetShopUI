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

  return (
    <div className="container mt-5">
      <h2>Pets available for adoption</h2>
      <div className="row">
        {pets.map((pet) => (
          <div key={pet.petID} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">
                  Species: {pet.species}
                  <br />
                  Age: {pet.age}
                  <br />
                  Price: {pet.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetPage;
