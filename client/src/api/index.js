import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getVideogame = async (totalPages) => {
  const requests = [];
  const baseUrl = `${API_URL}?key=${API_KEY}&page=`;

  for (let page = 1; page <= totalPages; page++) {
    requests.push(axios.get(`${baseUrl}${page}`));
  }

  try {
    const responses = await Promise.all(requests);
    const videogames = responses.flatMap((res) => res.data.results);
    return videogames;
  } catch (error) {
    console.error("Error fetching videogames:", error);
    return []; // Devolver un arreglo vacío en caso de error
  }
};

export const getVideogameByID = ({ id }) => {
  //const baseUrl = `${API_URL}/${id}?key=${API_KEY}`;
  return axios
    .get(`${API_URL}/${id}?key=${API_KEY}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
