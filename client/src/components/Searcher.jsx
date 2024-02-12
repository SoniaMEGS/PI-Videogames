import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setFiltering } from "../redux/actions.js";

const Searcher = () => {
  // Obtiene el estado 'videogames' del almacenamiento Redux
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();
  // Declara un estado local
  const [inputValue, setInputValue] = useState("");

  // Declara una función que se ejecuta cuando cambia el valor del input.
  const handleInputChange = (event) => {
    // Obtiene el valor del input del evento.
    const { value } = event.target;
    setInputValue(value);
  };

  // Declara una función que se ejecuta recibir un valor.
  const handleSearch = () => {
    const filterByName = videogames.filter((dg) => {
      return dg.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    // Envía una acción Redux para actualizar el estado de búsqueda con los perros filtrados.
    dispatch(setSearch(filterByName));
  };

  // Utiliza el efecto useEffect para realizar acciones cuando cambia el valor de 'inputValue'.
  useEffect(() => {
    if (inputValue == "") {
      dispatch(setFiltering(false));
    } else {
      handleSearch();
      dispatch(setFiltering(true));
    }
  }, [inputValue]);

  return (
    <div>
      <input onChange={handleInputChange} placeholder="Search game..." />
    </div>
  );
};

export default Searcher;
