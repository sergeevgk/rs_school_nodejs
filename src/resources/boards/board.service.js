const boardsRepo = require('./board.memory.repository');
const { ErrorInfo } = require('../../helpers/error-handler');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => {
  const board = boardsRepo.getBoardById(id);
  if (!board) {
    throw new ErrorInfo(404, `Board ${id} does not exist`);
  }
  return board;
};
const createBoard = data => {
  const board = boardsRepo.createBoard(data);
  if (!board) {
    throw new ErrorInfo(500, 'Board creation resulted in error');
  }
  return board;
};
const updateBoard = data => {
  const updatedBoard = boardsRepo.updateBoard(data);
  if (!updatedBoard) {
    throw new ErrorInfo(404, `Board ${data.id} does not exist`);
  }
  return updatedBoard;
};
const deleteBoard = id => {
  const deletedId = boardsRepo.deleteBoard(id);
  if (!deletedId) {
    throw new ErrorInfo(404, `Board ${id} does not exist`);
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
