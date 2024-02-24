require("dotenv").config();
const { URL, API_KEY } = process.env;
const { videogame, genres } = require("../db");
const axios = require("axios");

async function getVideogames(req, res) {
  try {
    const requests = [];
    const url = `${URL}?key=${API_KEY}&page=`;
    for (let page = 1; page <= 5; page++) {
      requests.push(axios(`${url}${page}`));
    }
    const responses = await Promise.all(requests);
    const videogames = responses.flatMap((res) => res.data.results);

    const data = await videogame.findAll();
    const videogamesApiDB = data.concat(videogames);
    res.status(200).json(videogamesApiDB);
  } catch (error) {
    console.error("Error, game could not be found:", error.message);
    res.status(500).send("Server error");
  }
}

module.exports = getVideogames;
