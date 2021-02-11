const router = require('express').Router();
const boardService = require('./board.service');
const { deleteAllTasksFromBoard } = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();

    return res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardService.createBoard(req.body);

    return res.json(newBoard);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getBoardById(id);
    return res.json(board);
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const updatedBoard = await boardService.updateBoard({
      id,
      title,
      columns
    });

    return res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const deletedBoardId = await boardService.deleteBoard(id);
    await deleteAllTasksFromBoard(deletedBoardId);

    return res.json({ id: deletedBoardId });
  });

module.exports = router;
