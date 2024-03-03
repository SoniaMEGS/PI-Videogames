require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");
const Videogame = require("./models/Videogame");
const Generes = require("./models/Genres");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  { logging: console.log("Database connected..."), native: false }
);

Videogame(sequelize);
Generes(sequelize);

const { videogame, generes } = sequelize.models;

videogame.belongsToMany(generes, { through: "genres_videogame" });
generes.belongsToMany(videogame, { through: "genres_videogame" });

module.exports = {
  videogame,
  generes,
  conn: sequelize,
};
