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
  try {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return {};
    }
    users[index] = new User({
      id,
      name,
      login,
      password
    });
    return users[index];
  } catch (error) {
    console.log(error);
    // throw new Error(`User ${id} update error.`);
  }
};

const deleteUser = id => {
  try {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return {};
    }
    users.splice(index, 1);
    return id;
  } catch (error) {
    console.log(error);
    // throw new Error(`User ${id} delete error.`);
  }
};

// init();

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
