const { db, DataTypes } = require('../utils/database.util');
const { Character } = require('./character.model');
const { Movie } = require('./movie.model');

// Create our first model (table)
const CharacterInMovie = db.define(
  'characterInMovie',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    characterId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Character,
        key: 'id'
      },
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Movie,
        key: 'id'
      },
      allowNull: false,
    }
  }
);

module.exports = { CharacterInMovie };
