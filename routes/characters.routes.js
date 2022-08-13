const express = require('express');

// Controllers
const {
  getAllCharacters,
  getCharacterByName,
  getCharacterByAge,
  getCharacterByMovie,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  assignCharacterToMovie
} = require('../controllers/characters.controller');

//Utils
const { upload } = require('../utils/upload.util');

// Middlewares
const {
  createCharacterValidators,
  createCharacterInMovieValidators
} = require('../middlewares/validators.middleware');

const { characterExists } = require('../middlewares/character.middleware');
const { movieExists } = require('../middlewares/movie.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const charactersRouter = express.Router();

charactersRouter.use(protectSession);

charactersRouter.get('/', getAllCharacters);

charactersRouter.get('/name/:name', getCharacterByName);
charactersRouter.get('/age/:age', getCharacterByAge);
charactersRouter.get('/movies/:name', getCharacterByMovie);

charactersRouter.post('/', upload.single('image'), createCharacterValidators, createCharacter);
charactersRouter.post('/assignCharacterToMovie', createCharacterInMovieValidators, assignCharacterToMovie)

charactersRouter
  .use('/:id', characterExists)
  .route('/:id')
  .patch(updateCharacter)
  .delete(deleteCharacter);

module.exports = { charactersRouter };