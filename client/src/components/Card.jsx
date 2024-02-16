import React from "react";
import "../style/Card.css";

const Card = (props) => {
  const { name, background_image, genres } = props;
  //console.log(genres);
  return (
    <article id={name} className="cardContainer">
      <div className="cardContainer_img">
        <img
          className="cardContainer_img-videogames"
          src={background_image}
          alt="Not Found"
        />
      </div>
      <p className="cardContainer_text">
        <span>Name: </span>
        {name}
      </p>
      <p className="cardContainer_text">
        <span>Genres: </span>
        {genres}
      </p>
    </article>
  );
};

export default Card;
