import React from "react";

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://placekitten.com/800/300" // Replace with actual image source
              className="d-block w-100"
              alt="Pet 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://placekitten.com/800/301" // Replace with actual image source
              className="d-block w-100"
              alt="Pet 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://placekitten.com/800/302" // Replace with actual image source
              className="d-block w-100"
              alt="Pet 3"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://placekitten.com/800/303" // Replace with actual image source
              className="d-block w-100"
              alt="Pet 4"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="mt-4">
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            "Join us in our mission to give every pet a loving home, and start
            your search for your new best friend on our website today!"
          </p>
          <br />
          <footer className="blockquote-footer">Fluffy Furr & Co.</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default HomePage;
