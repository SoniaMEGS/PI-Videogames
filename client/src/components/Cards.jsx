import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import Error from "./Error.jsx";
import Paginado from "./Paginated.jsx";
import "../style/Cards.css";

const Cards = (props) => {
  const { videogames } = props;

  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);

  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;

  useEffect(() => {
    videogames.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
  }, [videogames]);

  return (
    <div>
      {!isEmpty ? (
        <>
          <div className="videogamesList">
            {videogames
              ?.map(({ name, id, background_image, genres }) => (
                <NavLink key={id} to={`/detail/${id}`}>
                  <Card
                    key={name}
                    id={id}
                    name={name}
                    background_image={background_image}
                    genres={
                      isNaN(id)
                        ? genres.join(", ")
                        : genres.map((gen) => gen?.name).join(", ")
                    }
                  />
                </NavLink>
              ))
              .slice(firstIndex, lastIndex)}
          </div>
          <Paginado
            videogamesPerPage={videogamesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            videogames={videogames}
          />
        </>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Cards;
