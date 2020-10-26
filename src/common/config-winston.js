const { createLogger, format, transports } = require('winston');
const path = require('path');

const configuration = {
  file: {
    level: 'warn',
    filename: path.join(__dirname, '../logs/error-warn.log'),
    handleException: false,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
      format.prettyPrint()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 1
  },
  console: {
    level: 'silly',
    handleExceptions: false,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
      format.prettyPrint()
    )
  }
};

const logger = createLogger({
  transports: [
    new transports.File(configuration.file),
    new transports.Console(configuration.console)
  ],
  exitOnError: false
});

module.exports = logger;
