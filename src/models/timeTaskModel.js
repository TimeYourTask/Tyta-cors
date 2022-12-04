const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeTaskSchema = new Schema(
  {
    time: [
      {
        start_date: {
          type: Date,
          default: new Date().toISOString()
        },
        end_date: {
          type: Date,
          default: null
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
