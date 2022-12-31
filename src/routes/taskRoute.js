const taskCtrl = require('../controllers/taskCtrl');
const { authMiddleware } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/task', authMiddleware, taskCtrl.createTask);
  app.get('/tasks', authMiddleware, taskCtrl.getTasks);
  app.get(
    '/project/:projectId/tasks',
    authMiddleware,
    taskCtrl.getTasksByProject
  );
  app.get('/task/:taskId', authMiddleware, taskCtrl.getOneTask);
  app.put('/task/:taskId', authMiddleware, taskCtrl.updateTask);
  app.delete('/task/:taskId', authMiddleware, taskCtrl.deleteTask);
};
