const { Error } = require('mongoose');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

class ErrorInfo extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const processError = (err, res) => {
  if (err instanceof ErrorInfo) {
    const { statusCode, message } = err;
    res
      .status(statusCode)
      .send(`Error: status code ${statusCode}. ${message}.`);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(
        `Error: status code ${INTERNAL_SERVER_ERROR}. Internal server error.`
      );
  }
};

module.exports = {
  ErrorInfo,
  processError
};
