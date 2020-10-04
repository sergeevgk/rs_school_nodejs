const fs = require('fs');
const fsPromises = require('fs').promises;

async function readableStream(filePath) {
  if (filePath === 'stdin') {
    return process.stdin;
  }
  const stream = await fsPromises
    .access(filePath, fs.constants.F_OK | fs.constants.R_OK)
    .then(() => {
      try {
        return fs.createReadStream(filePath);
      } catch (error) {
        const message = `Input stream error: file ${filePath} can't be processed properly.`;
        throw {
          name: 'Input Stream Error',
          message,
          exitCode: 2
        };
      }
    })
    .catch(error => {
      let message = 'Input file access error: ';
      if (error.code === 'ENOENT') {
        message += `file ${filePath} is missing.`;
      } else {
        message += `file ${filePath} can't be accessed.`;
      }
      throw {
        name: 'Input File Access Error',
        message,
        exitCode: 2
      };
    });
  return stream;
}

async function writeableStream(filePath) {
  if (filePath === 'stdout') {
    return process.stdout;
  }
  const stream = await fsPromises
    .access(filePath, fs.constants.F_OK | fs.constants.W_OK)
    .then(() => {
      try {
        return fs.createWriteStream(filePath, { flags: 'a+' });
      } catch (error) {
        const message = `Output stream error: file ${filePath} can't be processed properly.`;
        throw {
          name: 'Output Stream Error',
          message,
          exitCode: 2
        };
      }
    })
    .catch(error => {
      let message = 'Output file access error: ';
      if (error.code === 'ENOENT') {
        message += `file ${filePath} is missing.`;
      } else {
        message += `file ${filePath} can't be accessed.`;
      }
      throw {
        name: 'Output File Access Error',
        message,
        exitCode: 2
      };
    });
  return stream;
}

const transformStream = require('./transform-stream.js');

module.exports = { readableStream, transformStream, writeableStream };
