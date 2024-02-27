import { useState, useEffect } from "react";
import { setSearch, setSorting } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

const useVideogameFilter = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const [filteredVideogames, setFilteredVideogames] = useState([]);
  const [initialVideogames, setInitialVideogames] = useState([]);

  useEffect(() => {
    setInitialVideogames(videogames);
    setFilteredVideogames(videogames);
  }, [videogames]);

  const resetFilter = () => {
    setFilteredVideogames(initialVideogames);
  };

  const filterByGenre = (videogames, genre) => {
    if (genre === "none") {
      return videogames;
    }
    return videogames.filter((element) => {
      return isNaN(element.id)
        ? element.genres?.includes(genre)
        : element.genres &&
            element.genres?.some((g) =>
              g.name.toLowerCase().includes(genre.toLowerCase())
            );
    });
  };

  const filterByOrigin = (videogames, origin) => {
    if (origin === "none") {
      return videogames;
    }
    return videogames.filter((element) => {
      if (origin == "API") {
        return !isNaN(element.id);
      } else if (origin == "Database") {
        return isNaN(element.id);
      }
    });
  };

  const orderByName = (videogames, key, order) => {
    return videogames.slice().sort((a, b) => {
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
  };

  const orderByRating = (videogames, key, order) => {
    return videogames.slice().sort((a, b) => {
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
  };

  // Ejecutar efecto cuando cambien los videojuegos filtrados o los videojuegos iniciales
  useEffect(() => {
    if (initialVideogames.length === 0) return;
    dispatch(setSorting(true));
  }, [filteredVideogames, initialVideogames.length, dispatch]);

  return {
    filteredVideogames,
    filterByGenre,
    filterByOrigin,
    orderByName,
    orderByRating,
    resetFilter,
  };
};

export default useVideogameFilter;
