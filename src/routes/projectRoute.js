const projectCtrl = require('../controllers/projectCtrl');

module.exports = (app) => {
  app.post('project', projectCtrl.createProject);
  app.get('projects', projectCtrl.getProjects);
  app.get('project/:projectId', projectCtrl.getOneProject);
  app.delete('project/:projectId', projectCtrl.deleteProject);
  app.put('project/:projectId', projectCtrl.updateProjectInfos);
  app.put('project/:projectId/user/', projectCtrl.addUserToProject);
  app.delete('project/:projectId/user/', projectCtrl.removeUserFromProject);
};
