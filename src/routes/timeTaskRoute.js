const timeTaskCtrl = require('../controllers/timeTaskCtrl');
const { authMiddleware } = require('../middleware/authMiddleware');
const { verifyTaskIdParams } = require('../middleware/verifyTaskIdParams');

module.exports = (app) => {
  app.get('/timers', authMiddleware, timeTaskCtrl.getTimeTasks);
  app.get('/task/user/timer', authMiddleware, timeTaskCtrl.getUserTimeTasks);
  app.post(
    '/task/:task_id/start',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.startTimeTask
  );
  app.post(
    '/task/:task_id/end',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.endTimeTask
  );
  app.get(
    '/task/:task_id/timer',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.getOneTimeTask
  );
  app.put(
    '/task/:task_id/timer/:time_id',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.updateTimeTask
  );
  app.delete(
    '/task/:task_id/timer',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.deleteTimeTask
  );
};
