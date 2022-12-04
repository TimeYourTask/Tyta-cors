const timeTaskCtrl = require('../controllers/timeTaskCtrl');

module.exports = (app) => {
  app.post('/time_task', timeTaskCtrl.createTimeTask);
  app.get('/time_tasks', timeTaskCtrl.getTimeTasks);
  app.get('/time_task/:time_task_id', timeTaskCtrl.getOneTimeTask);
  app.put('/time_task/:time_task_id', timeTaskCtrl.updateTimeTask);
  app.delete('/time_task/:time_task_id', timeTaskCtrl.deleteTimeTask);
};
