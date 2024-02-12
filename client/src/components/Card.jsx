import React from "react";
import "../style/Card.css";

const Card = (props) => {
  const { name, background_image, genres } = props;
  //console.log(genres);
  return (
    <div id={name} className="cardContainer">
      <img src={background_image} alt="Not Found" />
      <p>
        <span>Name: </span>
        {name}
      </p>
      <p>
        <span>Genres: </span>
        {genres}
      </p>
    </div>
  );
};

export default Card;
