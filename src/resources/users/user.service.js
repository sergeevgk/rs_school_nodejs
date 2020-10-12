const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const createUser = data => usersRepo.createUser(data);
const updateUser = data => usersRepo.updateUser(data);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
