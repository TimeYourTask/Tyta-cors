const taskCtrl = require('../controllers/taskCtrl');
const { authMiddleware } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/task', authMiddleware, taskCtrl.createTask);
  app.get('/tasks', authMiddleware, taskCtrl.getTasks);
  app.get('/task/:task_id', authMiddleware, taskCtrl.getOneTask);
  app.put('/task/:task_id', authMiddleware, taskCtrl.updateTask);
  app.delete('/task/:task_id', authMiddleware, taskCtrl.deleteTask);
  app.get('/tasks/user/', authMiddleware, taskCtrl.getUserTasks);
};
