const TimeTask = require('../models/timeTaskModel');

const getTimeTask = (taskId) => {
  return new Promise((resolve, reject) => {
    TimeTask.findOne({ task: taskId })
      .then((timeTask) => {
        if (!timeTask) {
          resolve({ message: 'Timer not found' });
        }
        resolve({ timeTask });
      })
      .catch((error) => reject(error));
  });
}

exports.startTimeTask = (req, res) => {
  const taskId = req.params.task_id;
  getTimeTask(taskId)
    .then(data => {
      // data.message mean timeTask not found, so create it
      // else verify process for start a new timer
      if (data.message) {
        const newTimeTask = new TimeTask({ task: taskId, time: {} });
        newTimeTask
          .save()
          .then(() => res.status(201).json({ message: 'Timer created', newTimeTask }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        let lastTime = data.timeTask.time[data.timeTask.time.length - 1];
        // If end_date is null so a timer is running
        if (!(lastTime.end_date)) {
          return res.status(400).json({ message: 'A timer is running on this task, end the timer and retry' })
        }

        // Else init a new timer
        const updTime = {
          time: [
            ...data.timeTask.time,
            {
              start_date: new Date().toISOString()
            }
          ]
        }

        // Update TimeTask with the new timer
        TimeTask.findByIdAndUpdate(data.timeTask.id, updTime, { new: true })
          .then((result) => {
            if (!result) {
              return res.status(404).json({ message: 'Timer not found' });
            }
            return res
              .status(200)
              .json({ message: 'The timer has been modified correclty', result });
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(400).json({ error }))
};

exports.endTimeTask = (req, res) => {
  getTimeTask(req.params.task_id)
    .then((data) => {
      // data.message mean timeTask not found, so return error
      if (data.message) {
        return res.status(404).json({ message: 'Timer not found, start a new timer for init' });
      }

      let lastTime = data.timeTask.time[data.timeTask.time.length - 1];
      // If end_date is true, no timer is running and return error message
      if (lastTime.end_date) {
        return res.status(400).json({ message: 'No timer started' })
      }

      // Else stop current timer is running
      lastTime.end_date = new Date().toISOString();
      let updTime = {
        time: [
          ...data.timeTask.time
        ]
      }

      TimeTask.findByIdAndUpdate(data.timeTask.id, updTime, { new: true })
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: 'Timer not found' });
          }
          return res
            .status(200)
            .json({ message: 'The timer has been modified correclty', result });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getTimeTasks = (_, res) => {
  TimeTask.find()
    .then((timeTasks) => res.status(200).json({ timeTasks }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneTimeTask = (req, res) => {
  getTimeTask(req.params.task_id)
    .then((data) => {
      if (data.message) {
        return res.status(404).json({ message: data.message });
      }
      return res.status(200).json({ timeTask: data.timeTask });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTimeTask = (req, res) => {
  getTimeTask(req.params.task_id)
    .then((data) => {
      if (data.message) {
        return res.status(404).json({ message: data.message });
      }
      TimeTask.findByIdAndDelete(data.timeTask.id)
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: 'Timer not found' });
          }
          return res.status(200).json({ message: 'Timer deleted' });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.updateTimeTask = (req, res) => {
  if (!req.body.start_date || !req.body.end_date || !req.params.time_id) {
    res.status(400).json({ message: 'Missing data' });
  }
  getTimeTask(req.params.task_id)
    .then((data) => {
      if (data.message) {
        return res.status(404).json({ message: data.message });
      }
      let timer = data.timeTask.time;
      // Search specific time with id
      const timeIndex = timer.findIndex(time => time.id === req.params.time_id)

      // If timeIndex if false => not found
      if (timeIndex === -1) return res.status(404).json({ message: 'Time not found' });

      // Modify data of timer with index
      timer[timeIndex].start_date = req.body.start_date;
      timer[timeIndex].end_date = req.body.end_date;

      const updTime = {
        time: [
          ...timer
        ]
      }
      // Update timer with modified data
      TimeTask.findByIdAndUpdate(data.timeTask.id, updTime, { new: true })
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: 'Timer not found' });
          }
          return res
            .status(200)
            .json({ message: 'The timer has been modified correclty', result });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error })
    });
};
