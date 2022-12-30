const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['NOT_STARTED', 'IN_PROGRESS', 'DONE'],
      default: 'NOT_STARTED',
    },
    assigned: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
