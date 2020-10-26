const User = require('./user.db.model');

const getAll = async () => {
  return User.find({});
};

const getUserById = async id => {
  return User.findOne({ _id: id });
};

const createUser = async userData => {
  return User.create(userData);
};

const updateUser = async userData => {
  return User.updateOne({ _id: userData.id }, userData);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).ok === 1 ? id : null;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
