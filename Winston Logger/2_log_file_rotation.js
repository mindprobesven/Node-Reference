/* eslint-disable max-len */
/*
-------------------------------------------------------------------------------------------------------

Winston - Creating a console logger, format options and logging methods

Winston is designed to be a simple and universal logging library with support for multiple transports.
A transport is essentially a storage device for your logs.

-------------------------------------------------------------------------------------------------------
*/

const path = require('path');
const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const dailyRotateAccessLogFile = new transports.DailyRotateFile({
  level: 'info',
  format: format.combine(
    format.errors({ stack: false }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.printf((info) => `[ ${info.timestamp} ] ${info.level}: ${info.message}`),
  ),
  filename: path.join(__dirname, 'logs', 'access-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '2m',
  // Can be a number of files or days when appending a 'd'
  maxFiles: '14d',
});

const dailyRotateErrorLogFile = new transports.DailyRotateFile({
  level: 'error',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.printf((info) => `[ ${info.timestamp} ] ${info.level}: ${info.message} ${info.stack}`),
  ),
  filename: path.join(__dirname, 'logs', 'errors-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '2m',
  maxFiles: '14d',
});

const logger = createLogger({
  transports: [
    dailyRotateAccessLogFile,
    dailyRotateErrorLogFile,
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.errors({ stack: false }),
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.splat(),
        format.printf((info) => `[ ${info.timestamp} ] ${info.level}: ${info.message}`),
      ),
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.splat(),
        format.printf((info) => `[ ${info.timestamp} ] ${info.level}: ${info.message} ${info.stack}`),
      ),
    }),
  ],
});

// logger.info('Logging stuff to the log file');

logger.log('info', 'test message %s', 'my string');

// logger.error(new Error('Error as info'));

logger.log('error', 'Important error: ', new Error('Error as meta'));
