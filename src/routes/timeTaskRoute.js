const timeTaskCtrl = require('../controllers/timeTaskCtrl');

const { authMiddleware } = require('../middleware/auth.middleware');
const { verifyTaskIdParams } = require('../middleware/verifyTaskIdParams');
const { isAuthorized } = require('../middleware/authorization.middleware');
const { ROLES } = require('../config/global');

module.exports = (app) => {
  // Start a task
  app.post(
    '/task/:task_id/start',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.startTimeTask
  );

  // Stop a task
  app.post(
    '/task/:task_id/end',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.endTimeTask
  );

  // Get all timers of user current task
  app.get('/task/user/timer', authMiddleware, timeTaskCtrl.getUserTimeTasks);

  // Get all timers of a task
  app.get(
    '/task/:task_id/timer',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.getOneTimeTask
  );

  // Get single timer by id in all list of task times
  app.put(
    '/task/:task_id/timer/:time_id',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.updateTimeTask
  );

  // Remove timer of a task
  app.delete(
    '/task/:task_id/timer',
    authMiddleware,
    verifyTaskIdParams,
    timeTaskCtrl.deleteTimeTask
  );

  /**
   * Admin routes
   */

  // Get all timers
  app.get(
    '/admin/timers',
    authMiddleware,
    isAuthorized(ROLES.admin),
    timeTaskCtrl.getTimeTasks
  );
};
