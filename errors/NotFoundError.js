const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_NOT_FOUND, ERR_MESSAGE_NOT_FOUND } = require('../utils/constants');

module.exports = class NotFoundError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_NOT_FOUND, ERR_MESSAGE_NOT_FOUND);
    this.name = 'NotFoundError';
  }
};
