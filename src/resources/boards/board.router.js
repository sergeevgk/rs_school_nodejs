const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { deleteAllTasksFromBoard } = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();

    return res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const newBoard = await boardService.createBoard(req.body);

    return res.json(Board.toResponse(newBoard));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getBoardById(id);

    if (!board) {
      return res.status(404).json(`Board ${id} not found`);
    }

    return res.json(Board.toResponse(board));
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const updatedBoard = await boardService.updateBoard({
      id,
      title,
      columns
    });

    return res.json(Board.toResponse(updatedBoard));
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const deletedBoardId = await boardService.deleteBoard(id);
    deleteAllTasksFromBoard(deletedBoardId);

    return res.json({ id: deletedBoardId });
  });

module.exports = router;
