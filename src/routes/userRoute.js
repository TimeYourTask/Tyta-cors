const userCtrl = require('../controllers/userCtrl');

module.exports = (app) => {
  app.post('/user/register', userCtrl.userRegister);
  app.get('/users', userCtrl.getUsers);
  app.get('/user/:userId', userCtrl.getOneUser);
  app.delete('/user/:userId', userCtrl.deleteUser);
  app.put('/user/:userId', userCtrl.updateUser);
};
