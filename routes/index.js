const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { ERR_MESSAGE_WRONG_PAGE } = require('../utils/constants');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const { logout } = require('../controllers/logout');
const { validateSignInData, validateSignUpData } = require('../utils/validation');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const { auth } = require('../middlewares/auth');

router.post('/signin', validateSignInData, login);
router.post('/signup', validateSignUpData, createUser);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.post('/signout', auth, logout);

router.use('*', auth, (req, res, next) => {
  const err = new NotFoundError();
  err.message = ERR_MESSAGE_WRONG_PAGE;
  next(err);
});

module.exports = router;
