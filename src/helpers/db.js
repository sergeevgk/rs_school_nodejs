const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.db.model');
const Board = require('../resources/boards/board.db.model');
const Task = require('../resources/tasks/task.db.model');

const initialUsers = [
  new User({ name: 'user1', login: 'user1', password: '111', id: 1 }),
  new User({ name: 'user2', login: 'user2', password: '222' })
];

const initialBoards = [
  new Board({
    title: 'board1',
    columns: [
      { title: 'column1', order: 1, id: 1 },
      { title: 'column2', order: 2, id: 2 }
    ],
    id: 1
  }),
  new Board({ title: 'board2', columns: [] })
];

const initialTasks = [
  new Task({
    title: 'task1',
    description: 'task1',
    userId: 1,
    columnId: 1,
    boardId: 1
  }),
  new Task({
    title: 'task2',
    description: 'task2',
    userId: 1,
    columnId: 2,
    boardId: 1
  })
];

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', () => console.error('Connection to database failed.'));
  db.once('open', () => {
    console.log('Connection to database succeed.');
    db.dropCollection('users');
    db.dropCollection('boards');
    db.dropCollection('tasks');
    User.insertMany(initialUsers);
    Board.insertMany(initialBoards);
    Task.insertMany(initialTasks);
    callback();
  });
};

module.exports = connectToDB;
