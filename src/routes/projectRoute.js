const projectCtrl = require('../controllers/projectCtrl');
const { authMiddleware } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/team/:teamId/project', authMiddleware, projectCtrl.createProject);
  app.get('/admin/projects', authMiddleware, projectCtrl.getAllProjects);
  app.get('/project/:projectId', authMiddleware, projectCtrl.getOneProject);
  app.get(
    '/user/:userId/projects',
    authMiddleware,
    projectCtrl.getUserProjects
  );
  app.delete('/project/:projectId', authMiddleware, projectCtrl.deleteProject);
  app.put(
    '/project/:projectId',
    authMiddleware,
    projectCtrl.updateProjectInfos
  );
  app.put(
    '/project/:projectId/user/:userId',
    authMiddleware,
    projectCtrl.addUserToProject
  );
  app.delete(
    '/project/:projectId/user/:userId',
    authMiddleware,
    projectCtrl.removeUserFromProject
  );
};
