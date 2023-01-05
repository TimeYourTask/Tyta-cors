const projectCtrl = require('../controllers/projectCtrl');

const { authMiddleware } = require('../middleware/auth.middleware');
const { isAuthorized } = require('../middleware/authorization.middleware');
const { ROLES } = require('../config/global');

module.exports = (app) => {
  // Create project
  app.post('/team/:teamId/project', authMiddleware, projectCtrl.createProject);

  // Get single project by id
  app.get('/project/:projectId', authMiddleware, projectCtrl.getOneProject);

  // Get all projects of a user
  app.get(
    '/user/:userId/projects',
    authMiddleware,
    projectCtrl.getUserProjects
  );

  // Get all users in a project
  app.get(
    '/project/:projectId/users',
    authMiddleware,
    projectCtrl.getUserOfProject
  );

  // Update a project
  app.put(
    '/project/:projectId',
    authMiddleware,
    projectCtrl.updateProjectInfos
  );

  // Add user in a project
  app.put(
    '/project/:projectId/user/:userId',
    authMiddleware,
    projectCtrl.addUserToProject
  );

  // Remove user in a project
  app.delete(
    '/project/:projectId/user/:userId',
    authMiddleware,
    projectCtrl.removeUserFromProject
  );

  // Delete a project
  app.delete('/project/:projectId', authMiddleware, projectCtrl.deleteProject);

  /**
   * Admin routes
   */

  // Get all projects
  app.get(
    '/admin/projects',
    authMiddleware,
    isAuthorized(ROLES.admin),
    projectCtrl.getAllProjects
  );
};
