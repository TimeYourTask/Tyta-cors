const projectCtrl = require('../controllers/projectCtrl');
const { verifyToken } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/project', verifyToken, projectCtrl.createProject);
  app.get('/projects', verifyToken, projectCtrl.getProjects);
  app.get('/project/:projectId', verifyToken, projectCtrl.getOneProject);
  app.delete('/project/:projectId', verifyToken, projectCtrl.deleteProject);
  app.put('/project/:projectId', verifyToken, projectCtrl.updateProjectInfos);
  app.put('/project/:projectId/user/:userId', verifyToken, projectCtrl.addUserToProject);
  app.delete(
    '/project/:projectId/user/:userId',
    verifyToken,
    projectCtrl.removeUserFromProject
  );
};
