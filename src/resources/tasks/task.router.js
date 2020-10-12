const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await taskService.getAllTasksByBoard(boardId);

    return res.json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await taskService.createTask({
      title,
      order,
      description,
      userId,
      boardId, // boardId from request
      columnId
    });

    return res.json(Task.toResponse(task));
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.getTaskByIds(boardId, taskId);

    if (!task) {
      return res.status(404).json(`Task ${taskId} not found`);
    }

    return res.json(Task.toResponse(task));
  })
  .put(async (req, res) => {
    const { boardId, taskId } = req.params;
    const updatedTask = await taskService.updateTask(boardId, taskId, req.body);

    return res.json(Task.toResponse(updatedTask));
  })
  .delete(async (req, res) => {
    const { boardId, taskId } = req.params;
    const deletedTaskId = await taskService.deleteTask(boardId, taskId);

    return res.json({ id: deletedTaskId });
  });

module.exports = router;
