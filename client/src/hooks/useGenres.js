import React from "react";
import { useState, useEffect, useMemo } from "react";
import { getVideogameGenres } from "../api/index.js";

const useGenres = () => {
  const [genresList, setGenresList] = React.useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genres = await getVideogameGenres();
        //console.log(genres);
        if (genres.count) {
          const allGenres = genres?.results?.map((element) => element?.name);
          setGenresList(allGenres);
        } else {
          window.alert("Error");
        }
      } catch (error) {
        //window.alert("Error al obtener los géneros");
        console.error(error);
      }
    }
    fetchGenres();
  }, []);

  // Utilizamos useMemo para memoizar la lista de temperamentos
  const memoizedGenres = useMemo(() => genresList, [genresList]);

  return memoizedGenres;
};

export default useGenres;
