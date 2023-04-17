const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateKeyError = require('../errors/DuplicateKeyError');

const { STATUS_OK_CREATED } = require('../utils/constants');

// POST /signup
module.exports.createUser = (req, res, next) => {
  const { password } = req.body;
  return bcrypt.hash(password, 10).then((hash) => User.create({
    ...req.body, password: hash,
  })
    .then((user) => res.status(STATUS_OK_CREATED).send({
      // высылаем в ответ всё кроме хэша пароля
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        const conflictErr = new DuplicateKeyError();
        next(conflictErr);
      } else if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new BadRequestError();
        validationError.message = err.message;
        next(validationError);
      } else {
        next(err);
      }
    }));
};

// GET /users/me
module.exports.getUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch(next);
};

// PATCH /users/me
module.exports.updateUserInfo = (req, res, next) => {
  const id = req.user._id;

  return User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
  }, {
    new: true,
    runValidators: true,
  }).orFail(() => {
    throw new NotFoundError();
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        const conflictErr = new DuplicateKeyError();
        next(conflictErr);
      } else if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new BadRequestError();
        validationError.message = err.message;
        next(validationError);
      } else {
        next(err);
      }
    });
};
