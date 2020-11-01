const mongoose = require('mongoose');
const uuid = require('uuid');

const ColumnSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const BoardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: {
      type: [ColumnSchema],
      default: []
    }
  },
  { versionKey: false }
);

BoardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;

  return { id: _id, title, columns };
};

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
