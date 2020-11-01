const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.db.model');
// const Board = require('../resources/boards/board.db.model');
// const Task = require('../resources/tasks/task.db.model');
const { encryptPassword } = require('../utils/crypt');

// const initialUsers = [
//   new User({ name: 'test-admin', login: 'admin', password: 'admin', id: 1 }),
//   new User({ name: 'user2', login: 'user2', password: '222' })
// ];

// const initialBoards = [
//   new Board({
//     title: 'board1',
//     columns: [
//       { title: 'column1', order: 1, id: 1 },
//       { title: 'column2', order: 2, id: 2 }
//     ],
//     id: 1
//   }),
//   new Board({ title: 'board2', columns: [] })
// ];

// const initialTasks = [
//   new Task({
//     title: 'task1',
//     description: 'task1',
//     userId: 1,
//     columnId: 1,
//     boardId: 1
//   }),
//   new Task({
//     title: 'task2',
//     description: 'task2',
//     userId: 1,
//     columnId: 2,
//     boardId: 1
//   })
// ];

const addAdminUser = async () => {
  const hashedPassword = await encryptPassword('admin');
  User.create({
    name: 'test-admin',
    login: 'admin',
    password: hashedPassword,
    id: 1
  });
};

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  // move init to seeds
  // ? migrations
  db.on('error', () => console.error('Connection to database failed.'));
  db.once('open', async () => {
    console.log('Connection to database succeed.');
    db.dropCollection('users');
    db.dropCollection('boards');
    db.dropCollection('tasks');
    await addAdminUser();
    callback();
  });
};

module.exports = connectToDB;
