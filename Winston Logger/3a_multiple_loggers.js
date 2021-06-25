/* eslint-disable new-cap */
/* eslint-disable max-len */
/*
-------------------------------------------------------------------------------------------------------

Winston - Creating multiple loggers - Option 1

-------------------------------------------------------------------------------------------------------
*/

const { createLogger, transports, format } = require('winston');

const {
  combine, colorize, simple, label,
} = format;

const expressConsoleTransport = new transports.Console({
  level: 'info',
  format: combine(
    label({ label: 'Express' }),
    colorize(),
    simple(),
  ),
});

const mongoConsoleTransport = new transports.Console({
  level: 'info',
  format: combine(
    label({ label: 'Mongo' }),
    colorize(),
    simple(),
  ),
});

// One way to create multiple loggers is by defining multiple logger objects with createLogger()
const logger = {
  express: new createLogger({
    transports: [
      expressConsoleTransport,
    ],
    exitOnError: false,
  }),
  mongo: new createLogger({
    transports: [
      mongoConsoleTransport,
    ],
    exitOnError: false,
  }),
};

logger.express.log({
  level: 'info',
  message: 'This is an Express log message',
});

logger.mongo.log({
  level: 'info',
  message: 'This is a Mongo log message',
});
