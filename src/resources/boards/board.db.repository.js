const Board = require('./board.db.model');

const getAll = () => {
  return Board.find({});
};

const getBoardById = id => {
  return Board.findOne({ _id: id });
};

const createBoard = boardData => {
  return Board.create(boardData);
};

const updateBoard = boardData => {
  return Board.updateOne({ _id: boardData.id }, boardData);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).ok ? id : null;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
