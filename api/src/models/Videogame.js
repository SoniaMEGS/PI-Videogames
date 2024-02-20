const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const videogame = sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The "name" field cannot be null.',
          },
          notEmpty: {
            msg: 'The "name" field cannot be empty.',
          },
        },
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The "image" field cannot be null.',
          },
          notEmpty: {
            msg: 'The "image" field cannot be empty.',
          },
          isUrl: {
            msg: 'The "image" field must be a valid URL.',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The "description" field cannot be null.',
          },
          notEmpty: {
            msg: 'The "description" field cannot be empty.',
          },
        },
      },
      released: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'The "releaseDate" field must be a valid date.',
          },
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      timestamps: false,
    }
  );
  return videogame;
};
