// Models
const { Genre } = require('./genre.model');
const { Character } = require('./character.model');
const { Movie } = require('./movie.model');
const { CharacterInMovie } = require('./characterInMovie.model')

const initModels = () => {

    // 1 Genre -> M Movies
    Genre.hasMany(Movie, { foreignKey: 'genreId' });
    Movie.belongsTo(Genre);

    // M Character <-----> M Movie
    Character.belongsToMany(Movie, { through: CharacterInMovie });
    // M Movie <-----> M Character
    Movie.belongsToMany(Character, { through: CharacterInMovie });

};

module.exports = { initModels };
