const teamCtrl = require('../controllers/teamCtrl');

module.exports = (app) => {
  app.post('/team', teamCtrl.createTeam);
  app.get('/teams', teamCtrl.getTeams);
  app.get('/team/:teamId', teamCtrl.getOneTeam);
  app.delete('/team/:teamId', teamCtrl.deleteTeam);
  app.put('/team/:teamId', teamCtrl.updateTeamName);
  app.put('/team/:teamId/user/', teamCtrl.addUserToTeam);
  app.delete('/team/:teamId/user/', teamCtrl.removeUserFromTeam);
  app.put('/team/:teamId/project/', teamCtrl.addProjectToTeam);
  app.delete('/team/:teamId/project/', teamCtrl.removeProjectFromTeam);
};
