require("dotenv").config();
const { Op } = require("sequelize");
const { URL, API_KEY } = process.env;
const { videogame } = require("../db");
const axios = require("axios");

async function getVideogameID(req, res) {
  const { id } = req.params;
  const isNumber = !isNaN(id);
  try {
    if (isNumber) {
      const url = `${URL}/${id}?key=${API_KEY}`;
      const { data } = await axios(url);
      res.status(200).json(data);
    } else {
      console.log("estoy dentro hp");
      console.log(id);
      const game = await videogame.findOne({
        where: {
          id: id,
        },
      });
      console.log(game);
      res.status(200).json(game);
    }
  } catch (error) {
    console.error(`Error, could not find game with ID: ${id}`, error.message);
    res.status(500).send("Server error");
  }
}

module.exports = getVideogameID;
