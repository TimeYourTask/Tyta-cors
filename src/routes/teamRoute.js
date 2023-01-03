const teamCtrl = require('../controllers/teamCtrl');
const { authMiddleware } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/team', authMiddleware, teamCtrl.createTeam);
  app.get('/teams', authMiddleware, teamCtrl.getTeams);
  app.get('/teams/mine', authMiddleware, teamCtrl.getMyTeams);
  app.get('/team/:teamId', authMiddleware, teamCtrl.getOneTeam);
  app.get('/team/:teamId/users', authMiddleware, teamCtrl.getUserOfTeam);
  app.delete('/team/:teamId', authMiddleware, teamCtrl.deleteTeam);
  app.put('/team/:teamId', authMiddleware, teamCtrl.updateTeamName);
  app.put('/team/:teamId/user/', authMiddleware, teamCtrl.addUserToTeam);
  app.delete(
    '/team/:teamId/user/',
    authMiddleware,
    teamCtrl.removeUserFromTeam
  );
  app.put('/team/:teamId/project/', authMiddleware, teamCtrl.addProjectToTeam);
  app.delete(
    '/team/:teamId/project/',
    authMiddleware,
    teamCtrl.removeProjectFromTeam
  );
};
