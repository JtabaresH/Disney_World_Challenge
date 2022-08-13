const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { moment } = require('moment');

// Models
const { Movie } = require('../models/movie.model');
const { Character } = require('../models/character.model');
const { Genre } = require('../models/genre.model')
// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase.util');

const getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    attributes: ['id', 'title', 'image', 'score', 'genreId', 'creationDate'],
    include: [
      {
        model: Character,
        required: false,
        attributes: ['id', 'name', 'image'],
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    movies,
  });
});

const getMovieByName = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const movieByName = await Movie.findOne({
    where: { title: name },
    attributes: ['id', 'image', 'title', 'creationDate', 'score'],
    include: [
      {
        model: Character,
        required: false,
        attributes: ['id', 'name', 'image'],
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    movieByName,
  });
});

const getMovieByGenre = catchAsync(async (req, res, next) => {
  const { genreId } = req.params;

  const genre = await Genre.findOne({
    where: { id: genreId },
  });

  if (!genre) {
    return next(new AppError('Genre not found', 404));
  }

  const moviesByGenre = await Movie.findAll({
    where: { genreId },
    attributes: ['id', 'image', 'title', 'creationDate', 'score', 'genreId'],
    include: [
      {
        model: Character,
        required: false,
        attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
      },
    ],
    include: [
      {
        model: Genre,
        required: false,
        attributes: ['id', 'name', 'image'],
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    moviesByGenre,
  });
});

const getMovieByOrder = catchAsync(async (req, res, next) => {
  const { order } = req.query;

  const movies = await Movie.findAll({
    attributes: ['id', 'title', 'image', 'score', 'genreId', 'creationDate']
  })

  if (order === 'asc') {
    movies.sort((a, b) => {
      if (new Date(a.creationDate) < new Date(b.creationDate)) {
        return -1
      }
    })
    res.status(201).json({
      status: 'success',
      movies,
    });
  } else if (order === 'desc') {
    movies.sort((a, b) => {
      if (new Date(a.creationDate) > new Date(b.creationDate)) {
        return -1
      }
    })

    res.status(201).json({
      status: 'success',
      movies,
    });
  } else {
    return next(new AppError('Order not defined', 404))
  }

});

const createMovie = catchAsync(async (req, res, next) => {
  const { title, creationDate, score, genreId } = req.body;
  const { file } = req;

  const genre = await Genre.findOne({ where: { id: genreId } })

  if(!genre) {
    return next(new AppError('Genre not found', 404))
  }

  if (score <= 0 || score > 5) {
    return next(new AppError('Score must be between 0 and 5', 404))
  }

  const imgRef = ref(storage, `movies/${Date.now()}_${file.originalname}`);
  const imgRes = await uploadBytes(imgRef, file.buffer);

  const newMovie = await Movie.create({
    image: imgRes.metadata.fullPath,
    title,
    creationDate,
    score,
    genreId,
  });

  res.status(201).json({
    status: 'success',
    newMovie,
  });
});

const updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;
  const { title, creationDate, score, characterId, genreId } = req.body;

  await movie.update({
    title,
    creationDate,
    score,
    characterId,
    genreId,
  });

  res.status(201).json({ status: 'success', movie });
});

const deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;
  await movie.destroy();
  res.status(201).json({ status: 'success', movie });
});

module.exports = {
  getAllMovies,
  getMovieByName,
  getMovieByGenre,
  getMovieByOrder,
  createMovie,
  updateMovie,
  deleteMovie
};