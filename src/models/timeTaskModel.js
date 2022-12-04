const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeTaskSchema = new Schema(
  {
    time: [
      {
        start_data: {
          type: Date
        },
        end_date: {
          type: Date
        },
      },
    ],
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TimeTask', timeTaskSchema);
