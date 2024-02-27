import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getVideogame = async () => {
  try {
    const response = await axios.get(`${API_URL}/videogames`);
    const videogames = await response.data;
    return videogames;
  } catch (error) {
    console.error("Error fetching videogames:", error);
    return []; // Devolver un arreglo vacío en caso de error
  }
};

export const getVideogameByID = async ({ id }) => {
  try {
    const response = await axios.get(`${API_URL}/videogames/${id}`);
    const videogame = await response.data;
    return videogame;
  } catch (error) {
    console.error("Error fetching videogame:", error);
    return []; // Devolver un arreglo vacío en caso de error
  }
};

export const getVideogameByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/videogames_name?name=${name}`);
    const videogame = await response.data;
    return videogame;
  } catch (error) {
    console.error("Error fetching videogame:", error);
    return []; // Devolver un arreglo vacío en caso de error
  }
};

export const getVideogameGenres = async () => {
  try {
    const res = await axios.get(`${API_URL}/genres`);
    const genres = await res.data;
    return genres;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createVideogame = async (videogame) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/videogames`,
      {
        name: videogame.name,
        background_image: videogame.background_image,
        description: videogame.description,
        rating: videogame.rating,
        released: videogame.released,
        platforms: videogame.platforms,
        genres: videogame.genres,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    let men = new Error("This video game already exists.");
    return alert(men.message);
  }
};
