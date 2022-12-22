const userCtrl = require('../controllers/userCtrl');
const {authMiddleware} = require("../middleware/authMiddleware");


module.exports = (app) => {
  app.get('/users', authMiddleware, userCtrl.getUsers);
  app.get('/user/:userId', authMiddleware, userCtrl.getOneUser);
  app.delete('/user/:userId', authMiddleware, userCtrl.deleteUser);
  app.put('/user/:userId', authMiddleware, userCtrl.updateUser);
};
