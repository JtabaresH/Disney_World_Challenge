const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Genre } = require('../models/genre.model');
const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase.util');

const getAllGenres = catchAsync(async (req, res, next) => {
  
  const genres = await Genre.findAll({
    attributes: ['id', 'name', 'image'],
    include: [
      {
        model: Movie,
        required: false,
        attributes: [
          'id',
          'image',
          'title',
          'creationDate',
          'score',
          'genreId',
        ],
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    genres,
  });
});

const createGenre = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { file } = req;

  const imgRef = ref(storage, `genres/${Date.now()}_${file.originalname}`);
  const imgRes = await uploadBytes(imgRef, file.buffer);

  const newGenre = await Genre.create({
    name,
    image: imgRes.metadata.fullPath,
  });
  res.status(201).json({
    status: 'success',
    newGenre,
  });

  return newGenre;
});

const updateGenre = catchAsync(async (req, res, next) => {
  const { genre } = req;
  const { name } = req.body;

  await genre.update({ name });

  res.status(201).json({
    status: 'success',
    genre,
  });
});

const deleteGenre = catchAsync(async (req, res, next) => {
  const { genre } = req;
  await genre.destroy();
  res.status(201).json({ status: 'success', genre });
});

module.exports = {
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
};