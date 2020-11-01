const router = require('express').Router();
const { ErrorInfo } = require('../../helpers/error-handler');
const authService = require('./auth.service');

router.route('/').post(async (req, res, next) => {
  const { login, password } = req.body;
  const user = await authService.getUserByAuthData({ login, password });
  if (user) {
    const token = authService.getToken({
      userId: user._id,
      login: user.login
    });
    return res.status(200).json({ token });
  }
  return next(new ErrorInfo(403, 'Forbidden'));
});

module.exports = router;
