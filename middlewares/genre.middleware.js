// Models
const { Genre } = require('../models/genre.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const genreExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const genre = await Genre.findOne({
    where: { id },
  });

  if (!genre) {
    return next(new AppError('genre not found', 404));
  }

  req.genre = genre;
  next();
});

module.exports = { genreExists };