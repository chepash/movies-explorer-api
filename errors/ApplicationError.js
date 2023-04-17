const { ERR_STATUS_INTERNAL_SERVER, ERR_MESSAGE_INTERNAL_SERVER } = require('../utils/constants');

module.exports = class ApplicationError extends Error {
  constructor(status = ERR_STATUS_INTERNAL_SERVER, message = ERR_MESSAGE_INTERNAL_SERVER) {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;

    // (магия из вебинара)чтобы в стектрейсинге на серевере была не общая ошибка Error
    // а данные нашей кастомной ошибки
    Error.captureStackTrace(this, this.constructor);
  }
};
