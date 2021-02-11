const router = require('express').Router();
const { ErrorInfo } = require('../../helpers/error-handler');
const authService = require('./auth.service');
const { OK, FORBIDDEN } = require('http-status-codes');

router.route('/').post(async (req, res, next) => {
  const { login, password } = req.body;
  const user = await authService.getUserByAuthData({ login, password });
  if (user) {
    const token = authService.getToken({
      userId: user._id,
      login: user.login
    });
    return res.status(OK).json({ token });
  }
  return next(new ErrorInfo(FORBIDDEN, 'Forbidden'));
});

module.exports = router;
