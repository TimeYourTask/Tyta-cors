/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { ROLES } = require('../config/global');

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

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    // eslint-disable-next-line no-underscore-dangle
    delete ret.__v;
    return ret;
  },
});

taskSchema.pre('findOneAndDelete', async function (next) {
  const {
    _id: { _id, req },
  } = this._conditions;

  await mongoose.models.Task.findById(_id).then(async (task) => {
    if (task) {
      const isUserInProject = await mongoose.models.Project.find({
        _id: task.project,
        'users.user': req.userId,
      });
      if (isUserInProject.length === 0 && req.role !== ROLES.admin) {
        return next(new Error('Access denied!'));
      }
    }
  });

  this._conditions = { _id };

  next();
});

module.exports = mongoose.model('Task', taskSchema);
