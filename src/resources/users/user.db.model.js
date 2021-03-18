const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const schema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    registeredAt: String,
    numberOfTasks: Number,
    password: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

schema.statics.toResponse = user => {
  const { _id, name, login, registeredAt, numberOfTasks } = user;

  return { id: _id, name, login, registeredAt, numberOfTasks };
};

const User = mongoose.model('User', schema);

module.exports = User;
