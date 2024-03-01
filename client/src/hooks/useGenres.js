import React, { useState, useEffect, useMemo } from "react";
import { getVideogameGenres } from "../api/index.js";

const useGenres = () => {
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const genres = await getVideogameGenres();
      //console.log(genres);
      if (genres.length) {
        const allGenres = genres
          ?.map((element) => element?.name)
          .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        setGenresList(allGenres);
      } else {
        console.log("ERROR");
      }
    }
    fetchGenres();
  }, []);

  // Utilizamos useMemo para memoizar la lista de Genres
  const memoizedGenres = useMemo(() => genresList, [genresList]);

  return memoizedGenres;
};

export default useGenres;
