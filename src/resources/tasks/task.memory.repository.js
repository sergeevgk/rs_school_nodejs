const Task = require('./task.model');

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
};

const deleteTask = (boardId, taskId) => {
  const index = tasks.findIndex(
    task => task.id === taskId && task.boardId === boardId
  );
  if (index === -1) {
    return {};
  }
  tasks.splice(index, 1);
  return taskId;
};

const deleteAllTasksFromBoard = boardId => {
  const tasksToDelete = tasks.filter(task => task.boardId === boardId);
  tasksToDelete.forEach(task => tasks.splice(tasks.indexOf(task), 1));
};

const unassignUserFromTasks = async userId => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].userId === userId) {
      tasks[i].userId = null;
    }
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
