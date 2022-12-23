const userCtrl = require('../controllers/userCtrl');
const { verifyToken } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.get('/users', verifyToken, userCtrl.getUsers);
  app.get('/user/:userId', verifyToken, userCtrl.getOneUser);
  app.delete('/user/:userId', verifyToken, userCtrl.deleteUser);
  app.put('/user/:userId', verifyToken, userCtrl.updateUser);
};
