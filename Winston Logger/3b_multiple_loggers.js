/* eslint-disable new-cap */
/* eslint-disable max-len */
/*
-------------------------------------------------------------------------------------------------------

Winston - Creating multiple loggers - Option 2

-------------------------------------------------------------------------------------------------------
*/

const { Container, transports, format } = require('winston');

const {
  combine, colorize, simple, label,
} = format;

// Another way to create multiple loggers is by creating a winston.Container() and adding loggers to it.
const loggersContainer = new Container();

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

loggersContainer.add('Express', {
  transports: [
    expressConsoleTransport,
  ],
  exitOnError: false,
});

loggersContainer.add('Mongo', {
  transports: [
    mongoConsoleTransport,
  ],
  exitOnError: false,
});

const expressLogger = loggersContainer.get('Express');
const mongoLogger = loggersContainer.get('Mongo');

expressLogger.log({
  level: 'info',
  message: 'This is an Express log message',
});

mongoLogger.log({
  level: 'info',
  message: 'This is a Mongo log message',
});
