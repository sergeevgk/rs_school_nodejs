const express = require('express');
require('express-async-errors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authRouter = require('./resources/authentication/auth.router');
const authChecker = require('./helpers/authCheck');
const { log } = require('./helpers/logger');
const { finished } = require('stream');
const { processError } = require('./helpers/error-handler');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// log requests
app.use((req, res, next) => {
  finished(res, () => log(req));
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', authRouter);

app.use('/users', authChecker, userRouter);

app.use('/boards', authChecker, boardRouter);

boardRouter.use('/:boardId/tasks', authChecker, taskRouter);

// handle & log errors
app.use((err, req, res, next) => {
  processError(err, res);
  log(req, err);
  next();
});

// handle & log uncaught exceptions
process.on('uncaughtException', error => {
  const errorBody = {
    statusCode: 500,
    message: `Uncaught Exception: ${error.message}`
  };
  log(null, errorBody);
});

// setTimeout(() => {
//   throw new Error('Oops!');
// }, 100);

// handle and log unhandled rejections
process.on('unhandledRejection', reason => {
  const errorBody = {
    statusCode: 500,
    message: `Unhandled Rejection: ${reason.message}`
  };
  log(null, errorBody);
});

// Promise.reject(new Error('Oops!'));

module.exports = app;
