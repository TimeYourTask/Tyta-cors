exports.verifyTaskIdParams = (req, res, next) => {
  if (!req.params.task_id) {
    return res.status(400).json({ message: 'task_id params is missing' })
  }
  next();
};
