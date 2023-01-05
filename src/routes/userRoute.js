const userCtrl = require('../controllers/userCtrl');

const { authMiddleware } = require('../middleware/auth.middleware');

module.exports = (app) => {
  // Get single user by id
  app.get('/user/:userId', authMiddleware, userCtrl.getOneUser);

  // Get all users
  app.get('/users', authMiddleware, userCtrl.getUsers);

  // Update single user by id
  app.put('/user/:userId', authMiddleware, userCtrl.updateUser);

  // Remove single user by id
  app.delete('/user/:userId', authMiddleware, userCtrl.deleteUser);
};
