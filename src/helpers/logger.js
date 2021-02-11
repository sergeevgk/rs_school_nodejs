const winston = require('../common/config-winston');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const log = (req, err) => {
  if (err) {
    const errorLog = {
      statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
      message: err.message || 'Internal server error'
    };
    if (req) {
      errorLog.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    }
    winston.error(errorLog);
  } else {
    const logInfo = {
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      method: req.method,
      query: JSON.stringify(req.query),
      body: JSON.stringify(req.body)
    };
    winston.info(logInfo);
  }
};

module.exports = { log };
