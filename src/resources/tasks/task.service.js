const tasksRepo = require('./task.db.repository');
const Task = require('./task.db.model');
const { ErrorInfo } = require('../../helpers/error-handler');
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const getAllTasksByBoard = id => {
  return tasksRepo.getAllTasksByBoard(id).map(Task.toResponse);
};
const getTaskByIds = async (boardId, taskId) => {
  const task = await tasksRepo.getTaskByIds(boardId, taskId);
  if (!task) {
    throw new ErrorInfo(
      NOT_FOUND,
      `Task ${taskId} from board ${boardId} does not exist`
    );
  }
  return Task.toResponse(task);
};
const createTask = data => {
  const task = tasksRepo.createTask(data);
  if (!task) {
    throw new ErrorInfo(
      INTERNAL_SERVER_ERROR,
      'Task creation resulted in error'
    );
  }
  return Task.toResponse(task);
};
const updateTask = async (boardId, taskId, data) => {
  const task = await tasksRepo.updateTask(boardId, taskId, data);
  if (!task) {
    throw new ErrorInfo(
      NOT_FOUND,
      `Task ${taskId} from board ${boardId} does not exist`
    );
  }
  return Task.toResponse(task);
};
const deleteTask = async (boardId, taskId) => {
  const deletedTaskId = await tasksRepo.deleteTask(boardId, taskId);
  if (!deletedTaskId) {
    throw new ErrorInfo(
      NOT_FOUND,
      `Task ${taskId} from board ${boardId} does not exist`
    );
  }
  return deletedTaskId;
};
const deleteAllTasksFromBoard = async boardId => {
  return tasksRepo.deleteAllTasksFromBoard(boardId);
};
const unassignUserFromTasks = async userId => {
  return tasksRepo.unassignUserFromTasks(userId);
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
