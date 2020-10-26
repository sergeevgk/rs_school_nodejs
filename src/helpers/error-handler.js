const { Error } = require('mongoose');

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
    res.status(500).send(`Error: status code ${500}. Internal server error.`);
  }
};

module.exports = {
  ErrorInfo,
  processError
};
