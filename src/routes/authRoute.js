const userCtrl = require('../controllers/userCtrl');

module.exports = (app) => {
  app.post('/register', userCtrl.userRegister);
  app.post('/login', userCtrl.userLogin);
  app.post('/reset-password', userCtrl.resetPassword);
  app.post('/reset-password/:token_id/:token', userCtrl.checkResetToken);
};
