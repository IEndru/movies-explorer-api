const { Movie } = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    if (movies.length === 0 || !movies) {
      res.send('Фильмы не найдены.');
    }
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(() => {
      throw new NotFoundError('Фильм с указанным id не найден');
    });
    if (String(movie.owner) !== String(req.user._id)) {
      throw new ForbiddenError('Запрещено удалять чужой фильм');
    }
    const deletedMovie = await Movie.deleteOne(movie);
    return res.send({ movie: deletedMovie });
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(err);
  }
  return null;
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const ownerId = req.user._id;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: ownerId,
      movieId,
      nameRU,
      nameEN,
    });
    res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getMovie,
  deleteMovieById,
  createMovie,
};
