const taskCtrl = require('../controllers/taskCtrl');

const { authMiddleware } = require('../middleware/auth.middleware');
const { isAuthorized } = require('../middleware/authorization.middleware');
const { ROLES } = require('../config/global');

module.exports = (app) => {
  // Create a task
  app.post('/task', authMiddleware, taskCtrl.createTask);

  // Get single task by id
  app.get('/task/:task_id', authMiddleware, taskCtrl.getOneTask);

  // Get all task assigned to as user
  app.get('/tasks/user/', authMiddleware, taskCtrl.getUserTasks);

  // Get all tasks in a project
  app.get(
    '/project/:projectId/tasks',
    authMiddleware,
    taskCtrl.getTasksByProject
  );

  // Update a task
  app.put('/task/:task_id', authMiddleware, taskCtrl.updateTask);

  // Delete a task
  app.delete('/task/:taskId', authMiddleware, taskCtrl.deleteTask);

  /**
   * Admin routes
   */

  // Get all tasks
  app.get(
    '/admin/tasks',
    authMiddleware,
    isAuthorized(ROLES.admin),
    taskCtrl.getTasks
  );
};
