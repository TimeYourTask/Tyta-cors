const Task = require('../models/taskModel');

exports.createTask = (req, res) => {
  const newTask = new Task(req.body);
  newTask
    .save()
    .then(() => res.status(201).json({ message: 'Task Created! :', newTask }))
    .catch((error) => res.status(500).json({ error }));
};

exports.getTasks = (req, res) => {
  Task.find()
    .then((tasks) => res.status(200).json({ tasks }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTask = (req, res) => {
<<<<<<< HEAD
  Task.findById(req.params.task_id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found!' });
      }
      return res.status(200).json({ task });
    })
=======
  Task.findById(req.params.TaskId)
    .then((task) => res.status(200).json({ task }))
>>>>>>> 12c9d6c (feat(controller/task): create task controller)
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTask = (req, res) => {
<<<<<<< HEAD
  Task.findByIdAndDelete(req.params.task_id)
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ message: 'No items deleted: task not found!' });
      }
      return res.status(200).json({ message: 'Task deleted!' });
    })
=======
  Task.findByIdAndDelete(req.params.TaskId)
    .then(() => res.status(200).json({ message: 'Task deleted!' }))
>>>>>>> 12c9d6c (feat(controller/task): create task controller)
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.updateTask = (req, res) => {
<<<<<<< HEAD
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
=======
  Task.findByIdAndUpdate(req.params.TaskId, req.body, {
    new: true,
    upsert: true,
  })
    .then((task) => {
      res
>>>>>>> 12c9d6c (feat(controller/task): create task controller)
        .status(200)
        .json({ message: 'The Task has been modified correclty!', task });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};
