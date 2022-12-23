const timeTaskCtrl = require('../controllers/timeTaskCtrl');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyTaskIdParams } = require('../middleware/verifyTaskIdParams');

module.exports = (app) => {
  app.get('/timers', verifyToken, timeTaskCtrl.getTimeTasks);
  app.get('/task/user/timer', verifyToken, timeTaskCtrl.getUserTimeTasks);
  app.post('/task/:task_id/start', verifyToken, verifyTaskIdParams, timeTaskCtrl.startTimeTask)
  app.post('/task/:task_id/end', verifyToken, verifyTaskIdParams, timeTaskCtrl.endTimeTask)
  app.get('/task/:task_id/timer', verifyToken, verifyTaskIdParams, timeTaskCtrl.getOneTimeTask)
  app.put('/task/:task_id/timer/:time_id', verifyToken, verifyTaskIdParams, timeTaskCtrl.updateTimeTask)
  app.delete('/task/:task_id/timer', verifyToken, verifyTaskIdParams, timeTaskCtrl.deleteTimeTask)
};
