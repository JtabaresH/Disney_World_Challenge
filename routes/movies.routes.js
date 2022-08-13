const express = require('express');

// Controllers
const {
  getAllMovies,
  getMovieByName,
  getMovieByGenre,
  getMovieByOrder,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies.controller');

// Middlewares
const {
  createMovieValidators,
} = require('../middlewares/validators.middleware');

const { movieExists } = require('../middlewares/movie.middleware');
const { genreExists } = require('../middlewares/genre.middleware');

//Utils
const { upload } = require('../utils/upload.util');

const { protectSession } = require('../middlewares/auth.middleware');

const moviesRouter = express.Router();

moviesRouter.use(protectSession);

moviesRouter.get('/', getAllMovies);

moviesRouter.get('/:name', getMovieByName);
moviesRouter.get('/genre/:genreId', getMovieByGenre);
moviesRouter.get('/order/:order', getMovieByOrder);

moviesRouter.post('/', upload.single('image'), createMovieValidators, createMovie);

moviesRouter
  .use('/:id', movieExists)
  .route('/:id')
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = { moviesRouter };