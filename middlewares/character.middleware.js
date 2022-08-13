// Models
const { Character } = require('../models/character.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const characterExists = catchAsync(async (req, res, next) => {
  const { id, name, age } = req.params;
  
  const character = await Character.findOne({
    where: { id: id || name || age }
  });

  if (!character) {
    return next(new AppError('character not found', 404));
  }

  req.character = character;
  next();
});

module.exports = { characterExists };