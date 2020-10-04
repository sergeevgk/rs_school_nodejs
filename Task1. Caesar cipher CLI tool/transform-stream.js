const through2 = require('through2');
const cipher = require('./cipher.js');

const transformStream = (shift, action) =>
  through2((chunk, _, callback) => {
    let transformedChunc;

    if (action === 'encode') {
      transformedChunc = cipher(chunk.toString(), shift);
    } else {
      transformedChunc = cipher(chunk.toString(), -shift);
    }

    callback(null, Buffer.from(transformedChunc)); // equal to this.push(...) before callback
  });

module.exports = transformStream;
