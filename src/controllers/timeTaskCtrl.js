const TimeTask = require('../models/timeTaskModel');

exports.createTimeTask = (req, res) => {
  const newTimeTask = new TimeTask({ ...req.body, time: {} });
  newTimeTask
    .save()
    .then(() => res.status(201).json({ message: 'TimeTask Created', newTimeTask }))
    .catch((error) => res.status(500).json({ error }));
};

exports.getTimeTasks = (req, res) => {
  TimeTask.find()
    .then((timeTasks) => res.status(200).json({ timeTasks }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTimeTask = (req, res) => {
  TimeTask.findById(req.params.time_task_id)
    .then((timeTask) => {
      if (!timeTask) {
        return res.status(404).json({ message: 'TimeTask not found' });
      }
      return res.status(200).json({ timeTask });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTimeTask = (req, res) => {
  TimeTask.findByIdAndDelete(req.params.time_task_id)
    .then((timeTask) => {
      if (!timeTask) {
        return res
          .status(404)
          .json({ message: 'No items deleted: TimeTask not found' });
      }
      return res.status(200).json({ message: 'TimeTask deleted' });
    })
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request', error })
    );
};

exports.updateTimeTask = (req, res) => {
  console.log(req.params);
  TimeTask.findById(req.params.time_task_id)
    .then((timeTask) => {
      if (!timeTask) {
        return res.status(404).json({ message: 'TimeTask not found' });
      }
      // Get last time registered
      let lastTime = timeTask.time[timeTask.time.length - 1];
      // Check value received
      // If start_date received check if timer is running
      if (req.body.start_date) {
        // If end_null is null so a start_date is running
        if (!(lastTime.end_date)) {
          return res.status(400).json({ message: 'A time is running on this task, you cant start a new time' })
        } else {
          // Else init a new time with start-date received
          const updTime = {
            time: [
              ...timeTask.time,
              {
                start_date: req.body.start_date
              }
            ]
          }
          TimeTask.findByIdAndUpdate(timeTask.id, updTime, { new: true })
            .then((result) => {
              if (!result) {
                return res.status(404).json({ message: 'TimeTask not found' });
              }
              return res
                .status(200)
                .json({ message: 'The TimeTask has been modified correclty', result });
            })
            .catch((error) =>
              res.status(401).json({ message: 'Invalid Request', error })
            );
        }
        // If end_date received check if a timer is running
      } else if (req.body.end_date) {
        if (!(lastTime.end_date)) {
          lastTime.end_date = req.body.end_date;
          let updTime = {
            time: [
              ...timeTask.time
            ]
          }
          TimeTask.findByIdAndUpdate(timeTask.id, updTime, { new: true })
            .then((result) => {
              if (!result) {
                return res.status(404).json({ message: 'TimeTask not found' });
              }
              return res
                .status(200)
                .json({ message: 'The TimeTask has been modified correclty', result });
            })
            .catch((error) =>
              res.status(401).json({ message: 'Invalid Request', error })
            );
        } else {
          return res.status(400).json({ message: 'No timer started' })
        }
      } else {
        return res.status(500).json({ message: 'Invalid body data' })
      }
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request', error })
    );
};
