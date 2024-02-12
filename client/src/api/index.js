/* import axios from "axios";

export const getVideogame = () => {
  return axios
    .get(
      "https://api.rawg.io/api/games?key=098d344b066c48d8b677287c1fcc3151&page=1"
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}; */

import axios from "axios";

export const getVideogame = async (totalPages) => {
  const requests = [];
  const baseUrl =
    "https://api.rawg.io/api/games?key=098d344b066c48d8b677287c1fcc3151&page=";

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
