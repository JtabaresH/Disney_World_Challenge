const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const Movie = db.define('movie', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	creationDate: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	score: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    genreId: {
        type: DataTypes.INTEGER,
		allowNull: false,
    }
});

module.exports = { Movie };
