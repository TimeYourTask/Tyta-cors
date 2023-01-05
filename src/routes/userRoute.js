const userCtrl = require('../controllers/userCtrl');

const { authMiddleware } = require('../middleware/auth.middleware');
const { isAuthorized } = require('../middleware/authorization.middleware');
const { ROLES } = require('../config/global');

module.exports = (app) => {
  // Get single user by id
  app.get('/user/:userId', authMiddleware, userCtrl.getOneUser);

  // Update single user by id
  app.put('/user/:userId', authMiddleware, userCtrl.updateUser);

  // Remove single user by id
  app.delete('/user/:userId', authMiddleware, userCtrl.deleteUser);

  /**
   * Admin routes
   */

  // Get all users
  app.get(
    '/admin/users',
    authMiddleware,
    isAuthorized(ROLES.admin),
    userCtrl.getUsers
  );
};
