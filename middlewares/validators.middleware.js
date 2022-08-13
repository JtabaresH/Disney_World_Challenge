const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('username')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('name must be a string'),
  body('email').notEmpty().isEmail().withMessage('Must provide a valid email'),
  body('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain letters and numbers'),
  checkResult,
];

const createCharacterValidators = [
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('name must be a string'),
  body('age')
    .notEmpty()
    .withMessage('age cannot be empty')
    .isNumeric()
    .withMessage('age must be a number'),
  body('weight')
    .notEmpty()
    .withMessage('weight cannot be empty')
    .isNumeric()
    .withMessage('weight must be a number'),
  body('history')
    .notEmpty()
    .withMessage('history cannot be empty')
    .isString()
    .withMessage('history must be a string'),
  checkResult,
];

const createMovieValidators = [
  body('title')
    .notEmpty()
    .withMessage('title cannot be empty')
    .isString()
    .withMessage('title must be a string'),
  body('creationDate')
    .notEmpty()
    .withMessage('creationDate cannot be empty')
    .isDate(["YYYY-MM-DD"])
    .withMessage("Format invalid, use 'YYYY-MM-DD'"),
  body('score')
    .notEmpty()
    .withMessage('score cannot be empty')
    .isNumeric()
    .withMessage('score must be a number')
    .custom((val) => val > 0)
    .withMessage('score cannot be a negative value'),
  body('genreId')
    .notEmpty()
    .withMessage('genreId cannot be empty')
    .isNumeric()
    .withMessage('genreId must be a number')
    .custom((val) => val > 0)
    .withMessage('personageId cannot be a negative value'),
  checkResult,
];

const createGenreValidators = [
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('name must be a string'),
  checkResult,
];

const createCharacterInMovieValidators = [
  body('characterId')
    .notEmpty()
    .withMessage('characterId cannot be empty')
    .isNumeric()
    .withMessage('characterId must be a number')
    .custom((val) => val > 0)
    .withMessage('characterId cannot be a negative value'),
  body('movieId')
    .notEmpty()
    .withMessage('movieId cannot be empty')
    .isNumeric()
    .withMessage('movieId must be a number')
    .custom((val) => val > 0)
    .withMessage('movieId cannot be a negative value'),
]

module.exports = {
  createUserValidators,
  createCharacterValidators,
  createMovieValidators,
  createGenreValidators,
  createCharacterInMovieValidators
};