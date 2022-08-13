const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const Character = db.define('character', {
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
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	weight: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	history: {
		type: DataTypes.STRING,
		allowNull: false,
	}
});

module.exports = { Character };
