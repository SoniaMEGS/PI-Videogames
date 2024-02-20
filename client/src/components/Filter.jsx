import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSorting, setSearch } from "../redux/actions.js";
import useVideogameFilter from "../hooks/useVideogameFilter.js";
import useGenres from "../hooks/useGenres.js";
import "../style/Filter.css";

const Filter = () => {
  const genres = useGenres();
  const dispatch = useDispatch();
  const initialFilterInput = {
    orderName: "",
    genre: "",
    orderRating: "",
  };
  const [filterInput, setFilterInput] = useState(initialFilterInput);
  const [initialVideogames, setInitialVideogames] = useState([]);
  const {
    filteredVideogames,
    filterByGenre,
    orderByName,
    orderByRating,
    resetFilter,
  } = useVideogameFilter();
  const areEqual = Object.keys(filterInput).every(
    (key) => filterInput[key] === initialFilterInput[key]
  );

  useEffect(() => {
    setInitialVideogames(filteredVideogames);
    // Aplicar filtros automáticamente al cargar la página
    handleApplyFilter();
  }, [filteredVideogames]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterInput({
      ...filterInput,
      [name]: value,
    });
  };

  const handleApplyFilter = () => {
    if (!areEqual) {
      dispatch(setSorting(true));
      handleFilter();
    } else {
      resetFilter(); // Restablecer los filtros
      dispatch(setSorting(false));
    }
  };

  const handleFilter = () => {
    let filteredResults = [...initialVideogames];
    if (filterInput.orderName !== "")
      filteredResults = orderByName(
        filteredResults,
        "name",
        filterInput.orderName
      );
    if (filterInput.orderRating !== "")
      filteredResults = orderByRating(
        filteredResults,
        "name",
        filterInput.orderRating
      );
    if (filterInput.genre !== "")
      filteredResults = filterByGenre(filteredResults, filterInput.genre);
    dispatch(setSearch(filteredResults));
  };

  return (
    <div className="filters">
      <select
        className="filters_section"
        name="orderName"
        id="orderName"
        value={filterInput.orderName}
        onChange={handleInputChange}
      >
        <option key="none" value="">
          Alphabetical
        </option>
        <option value="asc">A → Z</option>
        <option value="desc">Z → A</option>
      </select>
      <select
        className="filters_section"
        name="orderRating"
        id="orderRating"
        value={filterInput.orderRating}
        onChange={handleInputChange}
      >
        <option key="none" value="">
          Rating
        </option>
        <option value="asc">Lowerest → Highest</option>
        <option value="desc">Highest → Lowerest</option>
      </select>

      <select
        className="filters_section"
        name="genre"
        id="genre"
        value={filterInput.genre}
        onChange={handleInputChange}
      >
        <option key="none" value="">
          Genres
        </option>
        {genres.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="filters_section"
        name="origin"
        id="origin"
        // onChange={handleInputChange}
      >
        <option value="">Origin</option>
        <option value="">API</option>
        <option value="">Database</option>
      </select>
      <button className="filters_button" onClick={handleApplyFilter}>
        Aply
      </button>
    </div>
  );
};

export default Filter;
