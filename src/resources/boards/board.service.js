const boardsRepo = require('./board.db.repository');
const { ErrorInfo } = require('../../helpers/error-handler');

const getAll = () => boardsRepo.getAll();
const getBoardById = async id => {
  const board = await boardsRepo.getBoardById(id);
  if (!board) {
    throw new ErrorInfo(404, `Board ${id} does not exist`);
  }
  return board;
};
const createBoard = async data => {
  const board = await boardsRepo.createBoard(data);
  if (!board) {
    throw new ErrorInfo(500, 'Board creation resulted in error');
  }
  return board;
};
const updateBoard = async data => {
  const updatedBoard = await boardsRepo.updateBoard(data);
  if (!updatedBoard) {
    throw new ErrorInfo(404, `Board ${data.id} does not exist`);
  }
  return updatedBoard;
};
const deleteBoard = async id => {
  const deletedId = await boardsRepo.deleteBoard(id);
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
