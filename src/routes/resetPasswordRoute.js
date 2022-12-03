const userCtrl = require('../controllers/userCtrl');

module.exports = (app) => {
  app.post('/reset-password', userCtrl.resetPassword);
  app.post('/reset-password/:user_id/:token', userCtrl.checkResetToken);
};
