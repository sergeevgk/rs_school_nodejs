const { getUserByLogin } = require('../users/user.service');
const { checkPasswordEquality } = require('../../utils/crypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const getUserByAuthData = async data => {
  const { login, password } = data;
  const user = await getUserByLogin(login);
  const authenticated = await checkPasswordEquality(password, user.password);
  return authenticated ? user : null;
};

const getToken = userData => {
  const { userId, login } = userData;
  const token = jwt.sign({ userId, login }, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};

module.exports = { getUserByAuthData, getToken };
