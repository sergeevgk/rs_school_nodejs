const { JWT_SECRET_KEY } = require('../common/config');
const { ErrorInfo } = require('./error-handler');
const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ErrorInfo(401, 'Authentication scheme is incorrect');
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      throw new ErrorInfo(401, 'Unauthorized error');
    }
  });
  return next();
};

module.exports = authCheck;
