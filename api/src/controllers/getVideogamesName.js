require("dotenv").config();
const { URL_NAME, API_KEY } = process.env;
const { videogame } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

async function getNameVideoGame(req, res) {
  const { name } = req.query;
  try {
    const count = await videogame.count();
    const videogamesByNameDB = [];
    if (count) {
      const nameDB = await videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      nameDB.forEach((element) => {
        videogamesByNameDB.push(element);
      });
    }

    const { data } = await axios(`${URL_NAME}?search=${name}&key=${API_KEY}`);
    const videogamesByNameApi = data.results;
    const videogamesByNameApiDB =
      videogamesByNameDB.concat(videogamesByNameApi);

    return res.status(200).json(videogamesByNameApiDB);
  } catch (error) {
    console.error("No games with that name were found:", error.message);
    res.status(500).send(error.message);
  }
}

module.exports = getNameVideoGame;
