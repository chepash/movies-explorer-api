const winston = require('winston');
const expressWinston = require('express-winston');

// создадим логгер запросов
module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
      maxsize: 1000000, // 1 MB (in bytes)
      maxFiles: 5, // Number of log files to keep
    }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      maxsize: 1000000, // 1 MB (in bytes)
      maxFiles: 5, // Number of log files to keep
    }),
  ],
  format: winston.format.json(),
});

// логгер запусков
module.exports.startLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'app.log',
      maxsize: 1000000, // 1 MB (in bytes)
      maxFiles: 5, // Number of log files to keep
    }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
});
