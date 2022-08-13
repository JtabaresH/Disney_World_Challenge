const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const Genre = db.define('genre', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	name: {
        type: DataTypes.STRING,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = { Genre };
