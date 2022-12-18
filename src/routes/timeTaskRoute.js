const timeTaskCtrl = require('../controllers/timeTaskCtrl');
const { verifyTaskIdParams } = require('../middleware/verifyTaskIdParams');

module.exports = (app) => {
  app.get('/timers', timeTaskCtrl.getTimeTasks);
  app.post('/task/:task_id/start', verifyTaskIdParams, timeTaskCtrl.startTimeTask)
  app.post('/task/:task_id/end', verifyTaskIdParams, timeTaskCtrl.endTimeTask)
  app.get('/task/:task_id/timer', verifyTaskIdParams, timeTaskCtrl.getOneTimeTask)
  app.put('/task/:task_id/timer/:time_id', verifyTaskIdParams, timeTaskCtrl.updateTimeTask)
  app.delete('/task/:task_id/timer', verifyTaskIdParams, timeTaskCtrl.deleteTimeTask)
};
