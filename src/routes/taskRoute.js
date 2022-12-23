const taskCtrl = require('../controllers/taskCtrl');
const { verifyToken } = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.post('/task', verifyToken, taskCtrl.createTask);
  app.get('/tasks', verifyToken, taskCtrl.getTasks);
  app.get('/task/:task_id', verifyToken, taskCtrl.getOneTask);
  app.put('/task/:task_id', verifyToken, taskCtrl.updateTask);
  app.delete('/task/:task_id', verifyToken, taskCtrl.deleteTask);
};
