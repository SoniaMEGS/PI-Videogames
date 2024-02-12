import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import validation from "./validations";
import { getVideogameGenres } from "../api/index.js";
import "../style/Form.css";

const Form = () => {
  const formValues = {
    name: "",
    image: "",
    description: "",
    rating: "",
    released: "",
    platforms: [],
    genres: [],
  };
  const [videogameData, setVideogameData] = React.useState(formValues);
  const [errors, setErrors] = React.useState(formValues);
  const [genresList, setGenresList] = React.useState([]);
  const [newVideogames, setNewVideogames] = React.useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "genres") {
      const selectedGenres = videogameData.genres.includes(value)
        ? videogameData.genres.filter((option) => option !== value)
        : [...videogameData.genres, value];

      setVideogameData({
        ...videogameData,
        genres: selectedGenres,
      });
    } else if (name === "platforms") {
      const selectedPlatforms = videogameData.platforms.includes(value)
        ? videogameData.platforms.filter((option) => option !== value)
        : [...videogameData.platforms, value];

      setVideogameData({
        ...videogameData,
        platforms: selectedPlatforms,
      });
    } else {
      setVideogameData({ ...videogameData, [name]: value });
    }
    setErrors(
      validation({
        ...videogameData,
        [name]: value,
      })
    );
    //console.log(videogameData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(videogameData);
    setNewVideogames([...newVideogames, videogameData]); // Agrega el objeto VideogameData actual al estado newVideogames
    console.log(newVideogames); // Muestra el estado newVideogames en la consola
    setVideogameData(formValues); // Restablece los valores del formulario a los valores iniciales
  };

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genres = await getVideogameGenres();
        //console.log(genres);
        if (genres.count) {
          const allGenres = genres?.results?.map((element) => element.name);
          setGenresList(allGenres);
        } else {
          window.alert("Error");
        }
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
      }
    }
    fetchGenres();
  }, []);
  //console.log(genresList);

  const videogames = useSelector((state) => state.videogames);
  //console.log(videogames);
  const platformsArray = [
    ...new Set(
      videogames.flatMap((element) =>
        element.platforms.map((elm) => elm.platform.name)
      )
    ),
  ];
  //console.log(platformsArray);

  return (
    <div>
      <form className="newVideogameForm">
        <label>
          Name:
          <input
            type="text"
            name="name"
            key="name"
            value={videogameData.name}
            onChange={handleChange}
            placeholder="Videogame's name"
          />
        </label>
        {videogameData.name && errors.name && <p>{errors.name}</p>}
        <label>
          Image:
          <input
            type="text"
            name="image"
            key="image"
            value={videogameData.image}
            onChange={handleChange}
            placeholder="Image link..."
          />
        </label>
        {videogameData.image && errors.image && <p>{errors.image}</p>}
        <label>
          Description:
          <input
            type="text"
            name="description"
            key="description"
            value={videogameData.description}
            onChange={handleChange}
            placeholder="Description..."
          />
        </label>
        {videogameData.description && errors.description && (
          <p>{errors.description}</p>
        )}
        <label>
          Released:
          <input
            type="text"
            name="released"
            key="released"
            value={videogameData.released}
            onChange={handleChange}
            placeholder="YYYY/MM/DD"
          />
        </label>
        {videogameData.released && errors.released && <p>{errors.released}</p>}
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            key="rating"
            value={videogameData.rating}
            onChange={handleChange}
            placeholder="Rate it..."
          />
        </label>
        {videogameData.rating && errors.rating && <p>{errors.rating}</p>}
        <label className="newVideogameForm_check">
          <span>Platforms: </span>
          <div>
            {platformsArray.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`option${index}`}
                  name="platforms" // Cambiamos el valor del atributo name a "platforms"
                  value={item}
                  checked={videogameData.platforms.includes(item)} // Utilizamos videogameData.platforms para verificar si el temperamento está seleccionado
                  onChange={handleChange} // Usamos la misma función handleChange para manejar los cambios
                />
                <label htmlFor={`option${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </label>
        <label className="newVideogameForm_check">
          <span>Genres: </span>
          <div>
            {genresList.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`option${index}`}
                  name="genres" // Cambiamos el valor del atributo name a "genres"
                  value={item}
                  checked={videogameData.genres.includes(item)} // Utilizamos videogameData.genres para verificar si el temperamento está seleccionado
                  onChange={handleChange} // Usamos la misma función handleChange para manejar los cambios
                />
                <label htmlFor={`option${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </label>
        <button
          className="newVideogameForm_button"
          type="button"
          onClick={handleSubmit}
          disabled={
            !videogameData.name ||
            !videogameData.image ||
            !videogameData.description ||
            !videogameData.released ||
            !videogameData.rating ||
            errors.name ||
            errors.image ||
            errors.description ||
            errors.released ||
            errors.rating ||
            videogameData.platforms.length === 0 ||
            videogameData.genres.length === 0
          }
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
