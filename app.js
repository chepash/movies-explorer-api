const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const celebrate = require('celebrate');

const routes = require('./routes');

const {
  PORT,
  DB_ADDRESS,
  NODE_ENV,
  corsOptions,
  limiterOptions,
} = require('./config');

const { appErrorHandler } = require('./middlewares/appErrorHandler');
const { requestLogger, errorLogger, startLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const app = express();

app.use(requestLogger);
app.use(rateLimit(limiterOptions));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(errorLogger);
app.use(celebrate.errors());
app.use(appErrorHandler);

app.listen(PORT, () => {
  startLogger.info(`App listening on port ${PORT} in ${NODE_ENV} mode`);
});
