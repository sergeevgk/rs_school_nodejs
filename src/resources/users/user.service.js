const usersRepo = require('./user.db.repository');
const User = require('./user.db.model');
const { ErrorInfo } = require('../../helpers/error-handler');
const { encryptPassword } = require('../../utils/crypt');
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const getAll = () => {
  return usersRepo.getAll().map(User.toResponse);
};
const getUserById = async id => {
  const user = await usersRepo.getUserById(id);
  if (!user) {
    throw new ErrorInfo(NOT_FOUND, `User ${id} does not exist`);
  }
  return User.toResponse(user);
};

const getUserByLogin = async login => {
  const user = await usersRepo.getUserByLogin(login);
  if (!user) {
    throw new ErrorInfo(NOT_FOUND, `User with login ${login} does not exist`);
  }
  return user;
};

const createUser = async data => {
  const { password } = data;
  const hash = await encryptPassword(password);
  const user = await usersRepo.createUser({ ...data, password: hash });
  if (!user) {
    throw new ErrorInfo(
      INTERNAL_SERVER_ERROR,
      'User creation resulted in error'
    );
  }
  return User.toResponse(user);
};
const updateUser = async data => {
  const { password } = data;
  const hash = await encryptPassword(password);
  const user = await usersRepo.updateUser({ ...data, password: hash });
  if (!user) {
    throw new ErrorInfo(NOT_FOUND, `User ${data.id} does not exist`);
  }
  return User.toResponse(user);
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
