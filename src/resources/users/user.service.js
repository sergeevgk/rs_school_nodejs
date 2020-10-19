const usersRepo = require('./user.memory.repository');
const { ErrorInfo } = require('../../helpers/error-handler');

const getAll = () => usersRepo.getAll();
const getUserById = async id => {
  const user = await usersRepo.getUserById(id);
  if (!user) {
    throw new ErrorInfo(404, `User ${id} does not exist`);
  }
  return user;
};
const createUser = async data => {
  const user = await usersRepo.createUser(data);
  if (!user) {
    throw new ErrorInfo(500, 'User creation resulted in error');
  }
  return user;
};
const updateUser = async data => {
  const user = await usersRepo.updateUser(data);
  if (!user) {
    throw new ErrorInfo(404, `User ${data.id} does not exist`);
  }
  return user;
};
const deleteUser = id => {
  const userId = usersRepo.deleteUser(id);
  return userId;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
