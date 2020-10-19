const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const { unassignUserFromTasks } = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await userService.getAll();

      return res.json(users.map(User.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await userService.createUser(req.body);

      return res.json(User.toResponse(newUser));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.json(User.toResponse(user));
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, login, password } = req.body;
      const updatedUser = await userService.updateUser({
        id,
        name,
        login,
        password
      });

      return res.json(User.toResponse(updatedUser));
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUserId = await userService.deleteUser(id);
      await unassignUserFromTasks(deletedUserId);

      return res.json({ id: deletedUserId });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
