const mongoose = require('mongoose');
const {isURL} = require("validator");

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
        message(props) {
          return `${props.value} Невалидный формат URL!`;
        },
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
        message(props) {
          return `${props.value} Невалидный формат URL!`;
        },
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
        message(props) {
          return `${props.value} Невалидный формат URL!`;
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = { Movie };
