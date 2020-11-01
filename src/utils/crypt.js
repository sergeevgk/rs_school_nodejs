const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const encryptPassword = async pass => {
  return bcrypt.hash(pass, +SALT_ROUNDS);
};

const checkPasswordEquality = async (pass, hash) => {
  return bcrypt.compare(pass, hash);
};

module.exports = { encryptPassword, checkPasswordEquality };
