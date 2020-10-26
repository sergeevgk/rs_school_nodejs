const Task = require('./task.db.model');

const getAllTasksByBoard = async boardId => {
  return Task.find({ boardId });
};

const getTaskByIds = async (boardId, taskId) => {
  return Task.findOne({ boardId, _id: taskId });
};

const createTask = async taskData => {
  return Task.create(taskData);
};

const updateTask = async (boardId, taskId, taskData) => {
  return Task.updateOne({ boardId, _id: taskId }, taskData);
};

const deleteTask = async (boardId, taskId) => {
  return (await Task.deleteOne({ boardId, _id: taskId })).ok ? taskId : null;
};

const deleteAllTasksFromBoard = async boardId => {
  return Task.deleteMany({ boardId });
};

const unassignUserFromTasks = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAllTasksByBoard,
  getTaskByIds,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasksFromBoard,
  unassignUserFromTasks
};
