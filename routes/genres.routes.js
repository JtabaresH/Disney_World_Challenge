const express = require('express');

// Controllers
const {
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
} = require('../controllers/genres.controller');

// Middlewares
const {
  createGenreValidators,
} = require('../middlewares/validators.middleware');

// Utils
const { upload } = require('../utils/upload.util');

const { genreExists } = require('../middlewares/genre.middleware');

const genresRouter = express.Router();

const { protectSession } = require('../middlewares/auth.middleware');

genresRouter.use(protectSession);

genresRouter.get('/', getAllGenres);

genresRouter.post(
  '/',
  upload.single('image'),
  createGenreValidators,
  createGenre
);

genresRouter
  .use('/:id', genreExists)
  .route('/:id')
  .patch(updateGenre)
  .delete(deleteGenre);

module.exports = { genresRouter };