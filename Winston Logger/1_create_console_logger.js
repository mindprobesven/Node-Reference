/*
-------------------------------------------------------------------------------------------------------

Winston - Creating a console logger, format options and logging methods

Winston is designed to be a simple and universal logging library with support for multiple transports.
A transport is essentially a storage device for your logs.

-------------------------------------------------------------------------------------------------------
*/

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  // Log only if info.level less than or equal to this level
  level: 'info',
  // Optional: Appends {"service":"your-service-name"} to the output
  defaultMeta: { service: 'your-service-name' },
  // Set of logging targets. Here only the console.
  transports: [new transports.Console()],
  format: format.combine(
    // Adds a timestamp
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // Ouputs the error stack
    format.errors({ stack: true }),
    // Colorize the console output
    format.colorize(),
    // Allow string interpolation
    format.splat(),
    // Simple non-JSON output
    format.simple(),
  ),
});

// JSON logging
// -------------------------------------------------------------------------------------------------------
logger.log({
  level: 'info',
  message: 'Console JSON info message',
  additional: 'properties',
});
// Output: info: Console JSON info message {"additional":"properties","service":"your-service-name"}

logger.log({
  level: 'info',
  // Pass an object if format.json() is specified
  message: { first: 'Sven', last: 'Kohn' },
  additional: 'properties',
});

// Parameter-based logging
// -------------------------------------------------------------------------------------------------------
logger.info('Console info message');
// Output: info: Console info message {"service":"your-service-name"}

logger.log('info', 'Console log message', {
  additional: 'properties',
});
// Output: info: Console log message {"service":"your-service-name","additional":"properties"}

// String interpolation logging
// -------------------------------------------------------------------------------------------------------
logger.log('info', 'test message %s', 'my string');

// Error instance logging
// -------------------------------------------------------------------------------------------------------
logger.error(new Error('Error as info'));
logger.log('error', 'Important error: ', new Error('Error as meta'));
