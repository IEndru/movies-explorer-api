const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../utils/const');

const {
  getMovie,
  deleteMovieById,
  createMovie,
} = require('../controllers/movies');

const movieRouter = express.Router();

movieRouter.get('/', getMovie);

movieRouter.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteMovieById,
);

movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required()
        .regex(
          RegExp,
        ),
      trailerLink: Joi.string().required()
        .regex(
          RegExp,
        ),
      thumbnail: Joi.string().required()
        .regex(
          RegExp,
        ),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

module.exports = { movieRouter };
