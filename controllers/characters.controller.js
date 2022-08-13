const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Character } = require('../models/character.model');
const { Movie } = require('../models/movie.model');
const { CharacterInMovie } = require('../models/characterInMovie.model')
// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase.util');
const { AppError } = require('../utils/appError.util');

const getAllCharacters = catchAsync(async (req, res, next) => {
  const characters = await Character.findAll({
    attributes: ['id', 'name', 'image'],
  });

  res.status(201).json({
    status: 'success',
    characters,
  });
});

const getCharacterByName = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const characterByName = await Character.findOne({
    where: { name },
    attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
    include: [
      {
        model: Movie,
        required: false,
        attributes: ['id', 'image', 'title', 'creationDate'],
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    characterByName,
  });
});

const getCharacterByAge = catchAsync(async (req, res, next) => {
  const { age } = req.query;

  const characterByAge = await Character.findAll({
    where: { age },
    attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
    include: [
      {
        model: Movie,
        required: false,
        attributes: ['id', 'image', 'title', 'creationDate'],
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    characterByAge,
  });
});

const getCharacterByMovie = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const movieByName = await Movie.findOne({
    where: { title: name },
    include: [
      {
        model: Character,
        required: false,
      },
    ],
  });

  const characters = [];

  movieByName.characters.map((character) => {
    characters.push(character.name);
  });

  res.status(201).json({
    status: 'success',
    characters,
  });
});

const createCharacter = catchAsync(async (req, res, next) => {
  const { name, age, weight, history, movieId } = req.body;
  const { file } = req;

  const imgRef = ref(storage, `characters/${Date.now()}_${file.originalname}`);
  const imgRes = await uploadBytes(imgRef, file.buffer);

  const newCharacter = await Character.create({
    image: imgRes.metadata.fullPath,
    name,
    age,
    weight,
    history,
    movieId,
  });

  res.status(201).json({
    status: 'success',
    newCharacter,
  });
});

const updateCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, age, weight, history } = req.body;

  const character = await Character.findOne({ where: { id } })

  if (!character) {
    return next(new AppError('Character not found', 404))
  }

  await character.update({
    name,
    age,
    weight,
    history,
  });

  res.status(201).json({ status: 'success', character });
});

const deleteCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const character = await Character.findOne({ where: { id } })

  if (!character) {
    return next(new AppError('Character not found', 404))
  }

  await character.destroy();
  res.status(201).json({ status: 'success', character });
});

const assignCharacterToMovie = catchAsync(async (req, res, next) => {
  const { characterId, movieId } = req.body;

  const character = await Character.findOne({ where: { id: characterId } })
  const movie = await Movie.findOne({ where: { id: movieId } })

  if (!character || !movie) {
    return next(new AppError('Character or Movie not found', 404))
  }

  const characterInMovie = await CharacterInMovie.create({ characterId, movieId });

  res.status(201).json({
    status: 'success',
    characterInMovie,
  });
});

const getAllCharacterToMovie = catchAsync(async (req, res, next) => {
  const CharacterToMovie = await CharacterInMovie.findAll({});

  res.status(201).json({
    status: 'success',
    CharacterToMovie,
  });
});

module.exports = {
  getAllCharacters,
  getCharacterByName,
  getCharacterByAge,
  getCharacterByMovie,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  assignCharacterToMovie,
  getAllCharacterToMovie
};