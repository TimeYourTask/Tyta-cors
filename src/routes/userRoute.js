const userCtrl = require('../controllers/userCtrl');
// const authMiddleware = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/register', userCtrl.userRegister);
  app.post('/login', userCtrl.userLogin);
  app.get('/users', userCtrl.getUsers);
  app.get('/user/:userId', userCtrl.getOneUser);
  app.delete('/user/:userId', userCtrl.deleteUser);
  app.put('/user/:userId', userCtrl.updateUser);
};
