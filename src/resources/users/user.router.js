const router = require('express').Router();
const userService = require('./user.service');
const { unassignUserFromTasks } = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await userService.getAll();
    return res.json(users);
  })
  .post(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    return res.json(newUser);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    return res.json(user);
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const updatedUser = await userService.updateUser({
      id,
      name,
      login,
      password
    });

    return res.json(updatedUser);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const deletedUserId = await userService.deleteUser(id);
    await unassignUserFromTasks(deletedUserId);

    return res.json({ id: deletedUserId });
  });

module.exports = router;
