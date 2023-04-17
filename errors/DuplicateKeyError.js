const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_CONFLICT, ERR_MESSAGE_CONFLICT_EMAIL } = require('../utils/constants');

module.exports = class DuplicateKeyError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_CONFLICT, ERR_MESSAGE_CONFLICT_EMAIL);
    this.name = 'DuplicateKeyError';
  }
};
