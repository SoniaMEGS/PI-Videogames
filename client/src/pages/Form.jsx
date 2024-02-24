import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createVideogame } from "../api/index.js";
import validation from "../components/validations.js";
import useGenres from "../hooks/useGenres.js";
import usePlatforms from "../hooks/usePlatforms.js";
import "../style/Form.css";

const Form = () => {
  const genres = useGenres();
  const platforms = usePlatforms();
  const videogames = useSelector((state) => state.videogames);
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
  //const [newVideogames, setNewVideogames] = React.useState([]);

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

  const generateNewVideogame = (values) => {
    const newVideogame = {
      name: "",
      background_image: "",
      description: "",
      rating: "",
      released: "",
      platforms: "",
      genres: "",
    };
    // Creamos nuestro nuevo Videogames con los valores del form
    const { name, image, description, rating, released, platforms, genres } =
      values;
    // Asignamos la lista de platforms u genres pero en String al nuevo videogame
    const videogamePlatforms = platforms.join(", ");
    const videogameGenres = genres.join(", ");
    newVideogame.name = name;
    newVideogame.background_image = image;
    newVideogame.description = description;
    newVideogame.rating = rating;
    newVideogame.released = released;
    newVideogame.platforms = videogamePlatforms;
    newVideogame.genres = videogameGenres;

    return newVideogame;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(videogameData);
    const videogamesRes = [...videogames];
    const newVideogame = generateNewVideogame(videogameData);
    console.log(newVideogame);
    // Añadimos nuestro nuevo videogame al array clon de videogames del state.
    videogamesRes.push(newVideogame);
    createVideogame(newVideogame);
    // Restablece los valores del formulario a los valores iniciales
    //setVideogameData(formValues);
  };

  return (
    <section className="container">
      <form className="newVideogameForm">
        <div className="newVideogameForm_title">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7115/7115039.png"
            alt=""
          />
          <h2>Create a new videogame</h2>
        </div>
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Name:</p>
          <input
            className="newVideogameForm_label-input"
            type="text"
            name="name"
            key="name"
            value={videogameData.name}
            onChange={handleChange}
            placeholder="Videogame's name..."
          />
        </label>
        {videogameData.name && errors.name && (
          <p className="errorMessage">{errors.name}</p>
        )}
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Image:</p>
          <input
            className="newVideogameForm_label-input"
            type="text"
            name="image"
            key="image"
            value={videogameData.image}
            onChange={handleChange}
            placeholder="Image link..."
          />
        </label>
        {videogameData.image && errors.image && (
          <p className="errorMessage">{errors.image}</p>
        )}
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Description:</p>
          <input
            className="newVideogameForm_label-input"
            type="text"
            name="description"
            key="description"
            value={videogameData.description}
            onChange={handleChange}
            placeholder="Description..."
          />
        </label>
        {videogameData.description && errors.description && (
          <p className="errorMessage">{errors.description}</p>
        )}
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Released:</p>
          <input
            className="newVideogameForm_label-input"
            type="text"
            name="released"
            key="released"
            value={videogameData.released}
            onChange={handleChange}
            placeholder="YYYY/MM/DD"
          />
        </label>
        {videogameData.released && errors.released && (
          <p className="errorMessage">{errors.released}</p>
        )}
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Rating:</p>
          <input
            className="newVideogameForm_label-input"
            type="text"
            name="rating"
            key="rating"
            value={videogameData.rating}
            onChange={handleChange}
            placeholder="Rate it..."
          />
        </label>
        {videogameData.rating && errors.rating && (
          <p className="errorMessage">{errors.rating}</p>
        )}
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Platforms:</p>
          <div className="newVideogameForm_check">
            {platforms.map((item, index) => (
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
        <label className="newVideogameForm_label">
          <p className="newVideogameForm_label-p">Genres:</p>
          <div className="newVideogameForm_check">
            {genres.map((item, index) => (
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
        <div className="buttonContainer">
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
        </div>
      </form>
    </section>
  );
};

export default Form;
