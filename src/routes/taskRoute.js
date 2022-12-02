const taskCtrl = require('../controllers/taskCtrl');

module.exports = (app) => {
  app.post('/task', taskCtrl.createTask);
  app.get('/tasks', taskCtrl.getTasks);
  app.get('/task/:task_id', taskCtrl.getOneTask);
  app.put('/task/:task_id', taskCtrl.updateTask);
  app.delete('/task/:task_id', taskCtrl.deleteTask);
};
