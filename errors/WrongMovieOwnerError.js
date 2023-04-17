const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_FORBIDDEN, ERR_MESSAGE_FORBIDDEN } = require('../utils/constants');

module.exports = class WrongMovieOwnerError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_FORBIDDEN, ERR_MESSAGE_FORBIDDEN);
    this.name = 'WrongMovieOwnerError';
  }
};
