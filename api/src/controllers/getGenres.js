require("dotenv").config();
const { URL_GENRES, API_KEY } = process.env;
const { generes } = require("../db");
const axios = require("axios");

async function getGenres(req, res) {
  try {
    const count = await generes.count();
    if (count < 19) {
      const { data } = await axios(`${URL_GENRES}?key=${API_KEY}`);
      const allGenres = data.results.map((element) => ({ name: element.name }));
      for (const genreData of allGenres) {
        await generes.findOrCreate({
          //agrega los generos a la base de datos.
          where: { name: genreData.name },
        });
      }
    }
    const localGenres = await generes.findAll();
    res.status(200).json(localGenres);
  } catch (error) {
    console.error("Error, genres could not be found:", error.message);
    res.status(500).send("Server error");
  }
}

module.exports = getGenres;
