const teamCtrl = require('../controllers/teamCtrl');

const { authMiddleware } = require('../middleware/auth.middleware');
const { isAuthorized } = require('../middleware/authorization.middleware');
const { ROLES } = require('../config/global');

module.exports = (app) => {
  // Create a team
  app.post('/team', authMiddleware, teamCtrl.createTeam);

  // Get all user teams
  app.get('/teams/mine', authMiddleware, teamCtrl.getMyTeams);

  // Get a team by id
  app.get('/team/:teamId', authMiddleware, teamCtrl.getOneTeam);

  // Get all users in a team with his id
  app.get('/team/:teamId/users', authMiddleware, teamCtrl.getUserOfTeam);

  // Edit a team
  app.put('/team/:teamId', authMiddleware, teamCtrl.updateTeamName);

  // Add a user to a team
  app.put('/team/:teamId/user/', authMiddleware, teamCtrl.addUserToTeam);

  // Delete a user from a team
  app.delete(
    '/team/:teamId/user/',
    authMiddleware,
    teamCtrl.removeUserFromTeam
  );

  // Remove a team
  app.delete('/team/:teamId', authMiddleware, teamCtrl.deleteTeam);

  /**
   * Admin routes
   */

  // Get all teams
  app.get(
    '/admin/teams',
    authMiddleware,
    isAuthorized(ROLES.admin),
    teamCtrl.getTeams
  );
};
