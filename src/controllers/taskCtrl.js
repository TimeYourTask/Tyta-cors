const { ROLES } = require('../config/global');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

exports.createTask = async (req, res) => {
  const payload = {
    ...req.body,
    reporter: req.userId,
  };

  const newTask = new Task(payload);

  const isProjectExist = await Project.findById(payload.project);
  if (!isProjectExist) {
    return res
      .status(404)
      .json({ message: 'Project does not exist with this informations!' });
  }

  return newTask
    .save()
    .then(() =>
      res.status(201).json({ message: 'Task Created!', data: newTask })
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.getTasks = (_, res) => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => res.status(400).json({ error }));
};

exports.getTasksByProject = (req, res) => {
  const { projectId } = req.params;
  Task.find({ project: projectId })
    .populate('project')
    .then(async (tasks) => {
      // Blocks users who want to access other tasks without being project admin or project member
      const isUserInProject = await Project.find({
        _id: projectId,
        'users.user': req.userId,
      });
      if (isUserInProject.length === 0 && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      return res.status(200).json(tasks);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTask = (req, res) => {
  Task.findById(req.params.task_id)
    .then(async (task) => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found!' });
      }

      // Blocks users who want to access other tasks without being project admin or project member
      const isUserInProject = await Project.find({
        _id: task.project,
        'users.user': req.userId,
      });
      if (isUserInProject.length === 0 && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      return res.status(200).json(task);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTask = (req, res) => {
  const { taskId } = req.params;
  Task.findByIdAndDelete({ _id: taskId, req })
    .then(async (task) => {
      if (!task) {
        return res
          .status(404)
          .json({ message: 'No items deleted: task not found!' });
      }

      return res.status(200).json({ message: 'Task deleted!' });
    })
    .catch((error) => {
      if (error.message === 'Access denied!') {
        return res.status(401).json({ message: error.message });
      }

      return res.status(400).json({ message: 'Invalid Request!', error });
    });
};

exports.updateTask = (req, res) => {
  Task.findByIdAndUpdate(req.params.task_id, req.body, {
    new: true,
  })
    .then(async (task) => {
      if (!task) {
        return res
          .status(404)
          .json({ message: 'No items updated : task not found!' });
      }

      // Blocks users who want to access other tasks without being project admin or project member
      const isUserInProject = await Project.find({
        _id: task.project,
        'users.user': req.userId,
      });
      if (isUserInProject.length === 0 && req.role !== ROLES.admin) {
        return res.status(401).json({ message: 'Access denied!' });
      }

      return res
        .status(200)
        .json({ message: 'The Task has been modified correclty!', task });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assigned: req.userId });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong!' });
  }
};
