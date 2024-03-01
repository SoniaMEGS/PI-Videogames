import React from "react";
import "../style/Error.css";
import ErrorFeatures from "../assets/ray.png";

const Error = () => {
  return (
    <div className="errorContainer">
      <div className="errorContainer_container">
        <img
          src={ErrorFeatures}
          alt=""
          className="errorContainer_container-img"
        />
        <p className="errorContainer_container-text">
          Oops! There is no video game with the required features.
        </p>
      </div>
    </div>
  );
};

export default Error;
