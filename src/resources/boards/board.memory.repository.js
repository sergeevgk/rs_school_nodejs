const Board = require('./board.model');
// const uuid = require('uuid');

const boards = [];

// const init = () => {
//   for (let i = 0; i < 3; i++) {
//     const uid = uuid();
//     const title = `test${i}`;
//     const columns = [];
//     boards.push(new Board({ uid, title, columns }));
//   }
// };

const getAll = () => boards;

const getBoardById = id => boards.filter(board => board.id === id)[0];

const createBoard = ({ title, columns }) => {
  const board = new Board({ title, columns });
  boards.push(board);
  return board;
};

const updateBoard = ({ id, title, columns }) => {
  const index = boards.findIndex(board => board.id === id);
  if (index === -1) {
    return {};
  }
  boards[index] = new Board({
    id,
    title,
    columns
  });
  return boards[index];
};

const deleteBoard = id => {
  const index = boards.findIndex(user => user.id === id);
  if (index === -1) {
    return {};
  }
  boards.splice(index, 1);
  return id;
};

// init();

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
