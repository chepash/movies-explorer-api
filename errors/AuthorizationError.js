const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_UNAUTHORIZED, ERR_MESSAGE_UNAUTHORIZED } = require('../utils/constants');

module.exports = class AuthorizationError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_UNAUTHORIZED, ERR_MESSAGE_UNAUTHORIZED);
    this.name = 'AuthorizationError';
  }
};
