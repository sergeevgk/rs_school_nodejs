// const usersRepo = require('./user.memory.repository');
const usersRepo = require('./user.db.repository');
const { ErrorInfo } = require('../../helpers/error-handler');
const { encryptPassword } = require('../../utils/crypt');

const getAll = () => {
  return usersRepo.getAll();
};
const getUserById = async id => {
  const user = await usersRepo.getUserById(id);
  if (!user) {
    throw new ErrorInfo(404, `User ${id} does not exist`);
  }
  return user;
};

const getUserByLogin = async login => {
  const user = await usersRepo.getUserByLogin(login);
  if (!user) {
    throw new ErrorInfo(404, `User with login ${login} does not exist`);
  }
  return user;
};

const createUser = async data => {
  const { password } = data;
  const hash = await encryptPassword(password);
  const user = await usersRepo.createUser({ ...data, password: hash });
  if (!user) {
    throw new ErrorInfo(500, 'User creation resulted in error');
  }
  return user;
};
const updateUser = async data => {
  const { password } = data;
  const hash = await encryptPassword(password);
  const user = await usersRepo.updateUser({ ...data, password: hash });
  if (!user) {
    throw new ErrorInfo(404, `User ${data.id} does not exist`);
  }
  return user;
};
const deleteUser = id => {
  const userId = usersRepo.deleteUser(id);
  return userId;
};

module.exports = {
  getAll,
  getUserById,
  getUserByLogin,
  createUser,
  updateUser,
  deleteUser
};
