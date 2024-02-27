import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setFiltering, setLoading } from "../redux/actions.js";
import { getVideogameByName } from "../api/index";
import "../style/Searcher.css";

const Searcher = () => {
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  // Se ejecuta cuando cambia el valor del input.
  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  // Declara una función que se ejecuta recibir un valor.
  /* const handleSearch = () => {
    const filterByName = videogames.filter((dg) => {
      return dg.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    dispatch(setSearch(filterByName));
  }; */
  const handleSearch = async () => {
    const videogamesNameRes = await getVideogameByName(inputValue);
    dispatch(setSearch(videogamesNameRes));
  };

  // useEffect realiza acciones cuando cambia el valor
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
      <input
        onChange={handleInputChange}
        placeholder="Search game..."
        className="searcher"
      />
    </div>
  );
};

export default Searcher;
