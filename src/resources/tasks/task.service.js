const tasksRepo = require('./task.db.repository');
const { ErrorInfo } = require('../../helpers/error-handler');

const getAllTasksByBoard = id => {
  return tasksRepo.getAllTasksByBoard(id);
};
const getTaskByIds = async (boardId, taskId) => {
  const task = await tasksRepo.getTaskByIds(boardId, taskId);
  if (!task) {
    throw new ErrorInfo(
      404,
      `Task ${taskId} from board ${boardId} does not exist`
    );
  }
  return task;
};
const createTask = data => {
  return tasksRepo.createTask(data);
};
const updateTask = async (boardId, taskId, data) => {
  const task = await tasksRepo.updateTask(boardId, taskId, data);
  if (!task) {
    throw new ErrorInfo(
      404,
      `Task ${taskId} from board ${boardId} does not exist`
    );
  }
  return task;
};
const deleteTask = async (boardId, taskId) => {
  const deletedTaskId = await tasksRepo.deleteTask(boardId, taskId);
  if (!deletedTaskId) {
    throw new ErrorInfo(
      404,
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
