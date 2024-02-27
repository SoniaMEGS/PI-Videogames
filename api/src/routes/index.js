const { Router } = require("express");
const getVideoGames = require("../controllers/getVideogames");
const getVideogameID = require("../controllers/getVideogamesID");
const getVideogameName = require("../controllers/getVideogamesName");
const postVideoGame = require("../controllers/postVideogames");
const getGenres = require("../controllers/getGenres");

const router = Router();

router.get("/videogames", getVideoGames);
router.get("/videogames/:id", getVideogameID);
router.get("/videogames_name", getVideogameName);
router.get("/genres", getGenres);
router.post("/videogames", postVideoGame);

module.exports = router;
