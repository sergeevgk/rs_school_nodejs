const User = require('../resources/users/user.db.model');
const { encryptPassword } = require('../utils/crypt');

const seedData = async () => {
  await addAdminUser();
};

const deleteAdmin = () => {
  User.deleteOne({ name: 'test-admin'}, (err, res) => {
  })
}

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
    registeredAt: '2000-00-00',
    numberOfTasks: 2,
    id: 1
  });
};

module.exports = { seedData, deleteAdmin };
