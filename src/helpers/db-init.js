const User = require('../resources/users/user.db.model');
const { encryptPassword } = require('../utils/crypt');

const seedData = async () => {
  await addAdminUser();
};

// const dropData = db => {
//   db.dropCollection('users');
//   db.dropCollection('boards');
//   db.dropCollection('tasks');
// };

const addAdminUser = async () => {
  const hashedPassword = await encryptPassword('admin');
  User.create({
    name: 'test-admin',
    login: 'admin',
    password: hashedPassword,
    id: 1
  });
};

module.exports = seedData;
