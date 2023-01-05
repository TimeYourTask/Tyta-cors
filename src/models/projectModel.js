const mongoose = require('mongoose');

const { ROLES } = require('../config/global');

const { Schema } = mongoose;
const { Team, Task } = mongoose.models;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['admin', 'user'],
          default: 'user',
        },
      },
    ],
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.set('toJSON', {
  transform: (doc, ret) => {
    // eslint-disable-next-line no-underscore-dangle
    delete ret.__v;
    return ret;
  },
});

projectSchema.pre('findOneAndDelete', async function (next, req) {
  // eslint-disable-next-line no-underscore-dangle
  const projectId = this._conditions._id;
  await mongoose.models.Project.findById(projectId).then((project) => {
    if (project) {
      const isUserInTeamAndAdmin = project.users.some(
        (user) => user.user.id === req.userId && user.role === 'admin'
      );
      if (!isUserInTeamAndAdmin && req.role !== ROLES.admin) {
        return next(new Error('Access denied!'));
      }
    }
  });

  next();
});

projectSchema.pre('remove', function (next) {
  Team.updateOne(
    { id: this.team },
    {
      $pullAll: {
        projects: this.id,
      },
    }
  );

  Task.deleteMany({ project: this.id });

  next();
});

module.exports = mongoose.model('Project', projectSchema);
