const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovieData, validateDeleteMovieData } = require('../utils/validation');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', validateCreateMovieData, createMovie);

// удаляет фильм из избранного по уникальному _id объекта базы
// избранных фильмов, а не по movieId
router.delete('/:_id', validateDeleteMovieData, deleteMovie);

module.exports = router;
