import { useState, useEffect } from "react";
import { setSearch, setSorting } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

const useVideogameFilter = () => {
  const dispatch = useDispatch(); // Obtiene la función dispatch para despachar acciones
  const videogames = useSelector((state) => state.videogames); // Obtiene la lista de videojuegos del estado de Redux
  const [filteredVideogames, setFilteredVideogames] = useState([]); // Estado para almacenar los videojuegos filtrados
  const [initialVideogames, setInitialVideogames] = useState([]); // Estado para almacenar los videojuegos iniciales sin filtrar

  useEffect(() => {
    // Efecto para inicializar los videojuegos iniciales y filtrados cuando cambie la lista de videojuegos
    setInitialVideogames(videogames); // Almacena la lista de videojuegos iniciales
    setFilteredVideogames(videogames); // Almacena la lista de videojuegos filtrados (inicialmente sin filtrar)
  }, [videogames]); // Ejecutar efecto cuando cambie la lista de videojuegos

  const resetFilter = () => {
    // Función para restablecer los filtros y mostrar todos los videojuegos nuevamente
    setFilteredVideogames(initialVideogames); // Restablece los videojuegos filtrados al estado inicial
  };

  const filterByGenre = (videogames, genre) => {
    // Función para filtrar los videojuegos por género
    if (genre === "none") {
      return videogames; // Retorna todos los videojuegos si no se selecciona ningún género
    }
    return videogames.filter((element) => {
      // Filtra los videojuegos por el género seleccionado
      return isNaN(element.id)
        ? element.genres?.includes(genre)
        : element.genres &&
            element.genres?.some((g) =>
              g.name.toLowerCase().includes(genre.toLowerCase())
            );
    });
  };

  const filterByOrigin = (videogames, origin) => {
    // Función para filtrar los videojuegos por género
    if (origin === "none") {
      return videogames; // Retorna todos los videojuegos si no se selecciona ningún género
    }
    return videogames.filter((element) => {
      // Filtra los videojuegos por el género seleccionado
      if (origin == "API") {
        return !isNaN(element.id);
      } else if (origin == "Database") {
        return isNaN(element.id);
      }
    });
  };

  const orderByName = (videogames, key, order) => {
    // Función para ordenar los videojuegos por nombre
    return videogames.slice().sort((a, b) => {
      let valueA, valueB;
      if (key === "name") {
        valueA = a.name.toUpperCase(); // Obtiene el nombre del videojuego actual
        valueB = b.name.toUpperCase(); // Obtiene el nombre del siguiente videojuego
      }

      if (order === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0; // Ordena de forma ascendente
      } else if (order === "desc") {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0; // Ordena de forma descendente
      }
    });
  };

  const orderByRating = (videogames, key, order) => {
    // Función para ordenar los videojuegos por calificación
    return videogames.slice().sort((a, b) => {
      let valueA, valueB;
      if (key === "name") {
        valueA = a.rating; // Obtiene la calificación del videojuego actual
        valueB = b.rating; // Obtiene la calificación del siguiente videojuego
      }
      if (order === "asc") {
        return valueA - valueB; // Ordena de forma ascendente
      } else if (order === "desc") {
        return valueB - valueA; // Ordena de forma descendente
      }
    });
  };

  // Ejecutar efecto cuando cambien los videojuegos filtrados o los videojuegos iniciales
  useEffect(() => {
    // Efecto para indicar que se está aplicando un filtro
    if (initialVideogames.length === 0) return; // Evitar ejecución al montar el componente
    dispatch(setSorting(true)); // Despacha la acción para indicar que se está aplicando un filtro
  }, [filteredVideogames, initialVideogames.length, dispatch]);

  return {
    // Retorna las funciones y estados necesarios para filtrar y ordenar los videojuegos
    filteredVideogames,
    filterByGenre,
    filterByOrigin,
    orderByName,
    orderByRating,
    resetFilter,
  };
};

export default useVideogameFilter; // Exporta el hook personalizado
