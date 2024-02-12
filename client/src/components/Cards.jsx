import React from "react";
import Card from "./Card";
import "../style/Cards.css";

const Cards = (props) => {
  const { videogames } = props;
  console.log(videogames);
  return (
    <div className="videogamesList">
      {videogames?.map(({ name, background_image, genres }) => (
        <Card
          key={name}
          name={name}
          background_image={background_image}
          genres={genres.map((gen) => gen?.name).join(", ")}
        />
      ))}
    </div>
  );
};

export default Cards;
