const boardsRepo = require('./board.db.repository');
const Board = require('./board.db.model');
const { ErrorInfo } = require('../../helpers/error-handler');
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const getAll = () => {
  return boardsRepo.getAll().map(Board.toResponse);
};
const getBoardById = async id => {
  const board = await boardsRepo.getBoardById(id);
  if (!board) {
    throw new ErrorInfo(NOT_FOUND, `Board ${id} does not exist`);
  }
  return Board.toResponse(board);
};
const createBoard = async data => {
  const board = await boardsRepo.createBoard(data);
  if (!board) {
    throw new ErrorInfo(
      INTERNAL_SERVER_ERROR,
      'Board creation resulted in error'
    );
  }
  return Board.toResponse(board);
};
const updateBoard = async data => {
  const updatedBoard = await boardsRepo.updateBoard(data);
  if (!updatedBoard) {
    throw new ErrorInfo(NOT_FOUND, `Board ${data.id} does not exist`);
  }
  return Board.toResponse(updatedBoard);
};
const deleteBoard = async id => {
  const deletedId = await boardsRepo.deleteBoard(id);
  if (!deletedId) {
    throw new ErrorInfo(NOT_FOUND, `Board ${id} does not exist`);
  }
  return deletedId;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
