const teamCtrl = require('../controllers/teamCtrl');

module.exports = (app) => {
  app.post('/team', teamCtrl.createTeam);
  app.get('/teams', teamCtrl.getTeams);
  app.get('/team/:teamId', teamCtrl.getOneTeam);
  app.delete('/team/:teamId', teamCtrl.deleteTeam);
  app.put('/team/:teamId', teamCtrl.updateTeamName);
  app.put('/team/:teamId/user/', teamCtrl.addUserToTeam);
  app.delete('/team/:teamId/user/', teamCtrl.removeUserFromTeam);
};
