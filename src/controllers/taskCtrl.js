const Task = require('../models/taskModel');

exports.createTask = (req, res) => {
  const payload = {
    ...req.body,
    reporter: req.userId,
  };
  const newTask = new Task(payload);
  newTask
    .save()
    .then(() => res.status(201).json({ message: 'Task Created!', newTask }))
    .catch((error) => res.status(500).json({ error }));
};

exports.getTasks = (_, res) => {
  Task.find()
    .then((tasks) => res.status(200).json({ tasks }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getTasksByProject = (req, res) => {
  const { project_id } = req.params;
  Task.find({ project: project_id })
    .populate('project')
    .then((tasks) => {
      return res.status(200).json(tasks);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTask = (req, res) => {
  Task.findById(req.params.task_id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found!' });
      }
      return res.status(200).json({ task });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.task_id)
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ message: 'No items deleted: task not found!' });
      }
      return res.status(200).json({ message: 'Task deleted!' });
    })
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.updateTask = (req, res) => {
  console.log(req.params);
  Task.findByIdAndUpdate(req.params.task_id, req.body, {
    new: true,
  })
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ message: 'No items updated : task not found!' });
      }
      return res
        .status(200)
        .json({ message: 'The Task has been modified correclty!', task });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};
