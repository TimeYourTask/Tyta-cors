const teamCtrl = require('../controllers/teamCtrl');
const { verifyToken } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/team', verifyToken, teamCtrl.createTeam);
  app.get('/teams', verifyToken, teamCtrl.getTeams);
  app.get('/team/:teamId', verifyToken, teamCtrl.getOneTeam);
  app.delete('/team/:teamId', verifyToken, teamCtrl.deleteTeam);
  app.put('/team/:teamId', verifyToken, teamCtrl.updateTeamName);
  app.put('/team/:teamId/user/', verifyToken, teamCtrl.addUserToTeam);
  app.delete('/team/:teamId/user/', verifyToken, teamCtrl.removeUserFromTeam);
  app.put('/team/:teamId/project/', verifyToken, teamCtrl.addProjectToTeam);
  app.delete('/team/:teamId/project/', verifyToken, teamCtrl.removeProjectFromTeam);
};
