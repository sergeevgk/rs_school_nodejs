const winston = require('../common/config-winston');

const log = (req, err) => {
  if (err) {
    const errorLog = {
      statusCode: err.statusCode || '500',
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

// const toSecurityLog = body => {
//   if (body.password) {
//     return { ...body, password: "this log does not show user's password" };
//   }
//   return body;
// };

module.exports = { log };
