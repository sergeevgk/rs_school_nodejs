const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { deleteAllTasksFromBoard } = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardService.getAll();

      return res.json(boards.map(Board.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newBoard = await boardService.createBoard(req.body);

      return res.json(Board.toResponse(newBoard));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const board = await boardService.getBoardById(id);
      return res.json(Board.toResponse(board));
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, columns } = req.body;
      const updatedBoard = await boardService.updateBoard({
        id,
        title,
        columns
      });

      return res.json(Board.toResponse(updatedBoard));
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBoardId = await boardService.deleteBoard(id);
      await deleteAllTasksFromBoard(deletedBoardId);

      return res.json({ id: deletedBoardId });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
