const tasksRepo = require('./task.memory.repository');

const getAllTasksByBoard = id => tasksRepo.getAllTasksByBoard(id);
const getTaskByIds = (boardId, taskId) =>
  tasksRepo.getTaskByIds(boardId, taskId);
const createTask = data => tasksRepo.createTask(data);
const updateTask = (boardId, taskId, data) =>
  tasksRepo.updateTask(boardId, taskId, data);
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);
const deleteAllTasksFromBoard = boardId =>
  tasksRepo.deleteAllTasksFromBoard(boardId);
const unassignUserFromTasks = userId => tasksRepo.unassignUserFromTasks(userId);

module.exports = {
  getAllTasksByBoard,
  getTaskByIds,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasksFromBoard,
  unassignUserFromTasks
};
