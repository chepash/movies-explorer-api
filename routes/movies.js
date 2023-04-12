const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', createMovie);

// удаляет фильм из избранного по уникальному _id объекта базы
// избранных фильмов, а не по movieId
router.delete('/:_id', deleteMovie);

module.exports = router;
