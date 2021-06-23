/* eslint-disable max-len */
/*
-------------------------------------------------------------------------------------------------------

Winston - Log file rotation

This example creates three transports for logging

1. DailyRotateFile logs-%DATE%.log
- Logs all level logs as formatted string

2. DailyRotateFile errors-%DATE%.log
- Logs level: error as formatted string with error stack

3. Console
- Only logs to the console in development mode
- Logs all level logs as formatted string with error stack and colors
- The timestamp only shows the time, not the date

Start script with NODE_ENV=development:
In development mode the log file and console transports are used.
npm run 2-log-file-rotation-dev

Start script with NODE_ENV=production:
In prduction mode only the log file transports are used.
npm run 2-log-file-rotation-prod

-------------------------------------------------------------------------------------------------------
*/

const path = require('path');

const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const LOGS_DIR = '2_logs';

// Log file rotator tranports
// -------------------------------------------------------------------------------------------------------
const logFileRotator = new transports.DailyRotateFile({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    // With printf it is possible to create a custom log message
    format.printf((info) => `[ ${info.timestamp} ] ${info.level}: [ ${info.label} ] ${info.message}`),
  ),
  // This filename can include the %DATE% placeholder which will include the formatted datePattern at that point in the filename.
  filename: path.join(__dirname, LOGS_DIR, 'logs-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  // Can be a number of bytes, or units of kb, mb, and gb. If using the units, add 'k', 'm', or 'g' as the suffix
  maxSize: '2m',
  // Can be a number of files or days when appending a 'd'
  maxFiles: '14d',
});

const errorLogFileRotator = new transports.DailyRotateFile({
  level: 'error',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.printf((info) => `[ ${info.timestamp} ] ${info.level}: [ ${info.label} ] ${info.message} ${info.stack}`),
  ),
  filename: path.join(__dirname, LOGS_DIR, 'errors-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '2m',
  maxFiles: '14d',
});

const logger = createLogger({
  transports: [
    logFileRotator,
    errorLogFileRotator,
  ],
  // By default, winston will exit after logging an uncaughtException. If this is not the behavior you want, set exitOnError = false
  exitOnError: false,
});

// Console transport
// -------------------------------------------------------------------------------------------------------
// The console transport is conditionally added if the NODE_ENV = development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'info',
    format: format.combine(
      format.errors({ stack: true }),
      format.colorize(),
      format.timestamp({
        format: 'HH:mm:ss',
      }),
      format.splat(),
      format.printf((info) => `[ ${info.timestamp} ] ${info.level}: [ ${info.label} ] ${info.message} ${typeof info.stack !== 'undefined' ? info.stack : ''}`),
    ),
  }));
}

logger.log({
  level: 'info',
  label: 'Express - GET',
  message: 'This is a JSON object log message',
});

logger.log({
  level: 'error',
  label: 'Express - GET',
  message: new Error('Bad Request'),
});
