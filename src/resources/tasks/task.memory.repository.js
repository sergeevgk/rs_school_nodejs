const Task = require('./task.model');
// const uuid = require('uuid');

const tasks = [];

// const init = () => {
//   for (let i = 0; i < 3; i++) {
//     const uid = uuid();
//     const title = `test${i}`;
//     const userId = i;
//     const boardId = i;
//     const columnId = i;
//     tasks.push(new Task({ uid, title, userId, boardId, columnId }));
//   }
// };

const getAllTasksByBoard = async boardId => {
  const tasksByBoardId = tasks.filter(task => task.boardId === boardId);
  return tasksByBoardId;
};

const getTaskByIds = async (boardId, taskId) => {
  const tasksByBoardId = await getAllTasksByBoard(boardId);
  const task = tasksByBoardId.filter(t => t.id === taskId)[0];
  return task;
};

const createTask = async taskData => {
  const task = new Task({
    title: taskData.title,
    order: taskData.order,
    description: taskData.description,
    userId: taskData.userId,
    boardId: taskData.boardId,
    columnId: taskData.columnId
  });
  tasks.push(task);
  return task;
};

const updateTask = async (boardId, taskId, taskData) => {
  try {
    const index = tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    if (index === -1) {
      return {};
    }
    tasks[index] = new Task({
      id: taskId,
      title: taskData.title,
      order: taskData.order,
      description: taskData.description,
      userId: taskData.userId,
      boardId,
      columnId: taskData.columnId
    });
    return tasks[index];
  } catch (error) {
    console.log(error);
    // throw
  }
};

const deleteTask = (boardId, taskId) => {
  try {
    const index = tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    if (index === -1) {
      return {};
    }
    tasks.splice(index, 1);
    return taskId;
  } catch (error) {
    console.log(error);
  }
};

const deleteAllTasksFromBoard = boardId => {
  try {
    const tasksToDelete = tasks.filter(task => task.boardId === boardId);
    tasksToDelete.forEach(task => tasks.splice(tasks.indexOf(task), 1));
  } catch (error) {
    console.log(error);
  }
};

const unassignUserFromTasks = async userId => {
  try {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].userId === userId) {
        tasks[i].userId = null;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// init();

module.exports = {
  getAllTasksByBoard,
  getTaskByIds,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasksFromBoard,
  unassignUserFromTasks
};
