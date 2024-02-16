import { useState, useEffect } from "react";
import { setSearch, setSorting } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

const useVideogameFilter = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const [filteredVideogames, setFilteredVideogames] = useState([]);
  const [initialVideogames, setInitialVideogames] = useState([]);
  //console.log(videogames);
  useEffect(() => {
    setInitialVideogames(videogames);
    setFilteredVideogames(videogames);
  }, [videogames]);

  const resetFilter = () => {
    setFilteredVideogames(initialVideogames);
  };

  const filterByGenre = (genre) => {
    if (genre == "none") {
      return { ...filteredVideogames, setFilteredVideogames: videogames };
    }
    const filtered = initialVideogames.filter((element) => {
      return (
        element.genres &&
        element.genres.some((g) =>
          g.name.toLowerCase().includes(genre.toLowerCase())
        )
      );
    });

    setFilteredVideogames(filtered);
  };
  //console.log(filteredVideogames);

  const orderByName = (key, order) => {
    if (order === "none") {
      return setFilteredVideogames(videogames);
    }
    const sorted = filteredVideogames.slice().sort((a, b) => {
      let valueA, valueB;
      if (key === "name") {
        valueA = a.name.toUpperCase();
        valueB = b.name.toUpperCase();
      }

      if (order === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else if (order === "desc") {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
    setFilteredVideogames(sorted);
  };

  const orderByRating = (key, order) => {
    if (order === "none") {
      return setFilteredVideogames(videogames);
    }
    const sorted = filteredVideogames.slice().sort((a, b) => {
      let valueA, valueB;
      if (key === "name") {
        valueA = a.rating;
        valueB = b.rating;
      }
      if (order === "asc") {
        return valueA - valueB;
      } else if (order === "desc") {
        return valueB - valueA;
      }
    });
    setFilteredVideogames(sorted);
  };

  useEffect(() => {
    if (initialVideogames.length === 0) return; // Evitar ejecución al montar
    dispatch(setSorting(true)); // Indicar que se está filtrando
  }, [filteredVideogames, initialVideogames.length, dispatch]);

  return {
    filteredVideogames,
    filterByGenre,
    orderByName,
    orderByRating,
    resetFilter,
  };
};

export default useVideogameFilter;
