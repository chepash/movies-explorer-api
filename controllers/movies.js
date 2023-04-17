const mongoose = require('mongoose');

const { STATUS_OK_CREATED, ERR_MESSAGE_CONFLICT_MOVIE_ID } = require('../utils/constants');

const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const WrongMovieOwnerError = require('../errors/WrongMovieOwnerError');
const DuplicateKeyError = require('../errors/DuplicateKeyError');

// GET /movies
module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

// POST /movies
module.exports.createMovie = (req, res, next) => {
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

  Movie.find({ owner: req.user._id, movieId })
    .then((movie) => {
      // if there no such movies
      if (movie.length === 0) {
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          thumbnail,
          owner: req.user._id,
          movieId,
          nameRU,
          nameEN,
        })
          .then((createdMovie) => {
            res.status(STATUS_OK_CREATED).send(createdMovie);
          })
          .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
              const validationError = new BadRequestError();
              validationError.message = err.message;
              next(validationError);
            } else {
              next(err);
            }
          });
      } else {
        // if movie is with same movieId for this user already exist
        const conflictMovieErr = new DuplicateKeyError();
        conflictMovieErr.message = ERR_MESSAGE_CONFLICT_MOVIE_ID;
        next(conflictMovieErr);
      }
    })
    .catch(next);
};

// DELETE /movies/:_id
module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  return Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id) {
        return movie.deleteOne();
      }
      throw new WrongMovieOwnerError();
    })
    .then((movie) => res.send(movie))
    .catch(next);
};
