import React from "react";
import Image from "./Images/Image.png";
import Image1 from "./Images/Image1.png";
import Image2 from "./Images/Image2.png";
import Image3 from "./Images/Image3.png";

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
              src={Image} // Replace with actual image source
              className="d-block w-100"
              alt="Pet 1"
              width="800"
              height="550"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image1} // Replace with actual image source
              className="d-block w-100"
              alt="Pet 2"
              width="800"
              height="550"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image2} // Replace with actual image source
              className="d-block w-100"
              alt="Pet 3"
              width="800"
              height="550"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image3} // Replace with actual image source
              className="d-block w-100"
              alt="Pet 4"
              width="800"
              height="550"
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
