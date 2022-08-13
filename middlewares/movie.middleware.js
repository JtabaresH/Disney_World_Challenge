// Models
const { Movie } = require('../models/movie.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const movieExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id },
  });

  if (!movie) {
    return next(new AppError('movie not found', 404));
  }

  req.movie = movie;
  next();
});

module.exports = { movieExists };