const { videogame, generes } = require("../db");

async function postVideoGame(req, res) {
  console.log(req.body);
  try {
    // Verifica si ya existe un videojuego con el mismo nombre
    const equal = await videogame.findOne({ where: { name: req.body.name } });
    if (equal) {
      return res.status(400).send("This video game already exists.");
    }

    const platformsArray = req.body.platforms.split(", ");
    const genresArray = req.body.genres.split(", ");
    console.log("GENRES_STRING", genresArray);

    // Crea géneros y plataformas si no existen, y asocia al videojuego
    const createdGenres = genresArray.map(async (genre) => {
      await generes.findOrCreate({
        where: {
          name: genre,
        },
      });
    });

    await Promise.all(createdGenres);

    const { name, description, background_image, released, rating } = req.body;

    const [createdGame, created] = await videogame.findOrCreate({
      where: {
        name: name,
        description: description,
        background_image: background_image,
        released: released,
        rating: rating,
        platforms: platformsArray,
      },
    });

    if (!created) {
      return res.status(400).send("This video game already exists.");
    }
    console.log("VIDEO::", createdGame);

    const generesInstances = await generes.findAll({
      where: {
        name: genresArray,
      },
    });

    const generesNames = generesInstances.map((genre) => genre.name);

    await createdGame.addGeneres(generesInstances);
    await createdGame.update({ genres: generesNames });
    res
      .status(200)
      .json(await videogame.findOne({ where: { name: req.body.name } }));
  } catch (error) {
    console.error("Error creating the video game:", error.message);
    res.status(500).send("Server error");
  }
}

module.exports = postVideoGame;
