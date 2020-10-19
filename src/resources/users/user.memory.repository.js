const User = require('./user.model');
// const uuid = require('uuid');

const users = [];

// const init = () => {
//   for (let i = 0; i < 3; i++) {
//     const uid = uuid();
//     const name = `test${i}`;
//     const login = `login${i}`;
//     const pass = `pass${i}`;
//     users.push(new User({ uid, name, login, pass }));
//   }
// };

const getAll = async () => users;

const getUserById = async id => users.filter(user => user.id === id)[0];

const createUser = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  users.push(user);
  return user;
};

const updateUser = async ({ id, name, login, password }) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = new User({
    id,
    name,
    login,
    password
  });
  return users[index];
};

const deleteUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return null;
  }
  users.splice(index, 1);
  return id;
};

// init();

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
