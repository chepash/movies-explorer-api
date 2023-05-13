const { celebrate, Joi } = require('celebrate');
const { objectIdRegex } = require('./constants');
const { urlRegex } = require('./constants');

module.exports.validatePatchUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports.validateSignInData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignUpData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCreateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(urlRegex).required(),
    trailerLink: Joi.string().uri().regex(urlRegex).required(),
    thumbnail: Joi.string().uri().regex(urlRegex).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateDeleteMovieData = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().regex(objectIdRegex).required(),
  }),
});
