import React, { useState } from "react";
import Card from "./Card";
import Paginado from "./Paginated.jsx";
import "../style/Cards.css";

const Cards = (props) => {
  const { videogames } = props;
  console.log(videogames);

  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;

  return (
    <div>
      <div className="videogamesList">
        {videogames
          ?.map(({ name, background_image, genres }) => (
            <Card
              key={name}
              name={name}
              background_image={background_image}
              genres={genres.map((gen) => gen?.name).join(", ")}
            />
          ))
          .slice(firstIndex, lastIndex)}
      </div>
      <Paginado
        videogamesPerPage={videogamesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        videogames={videogames}
      />
    </div>
  );
};

export default Cards;
