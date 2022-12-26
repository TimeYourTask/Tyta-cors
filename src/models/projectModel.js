const mongoose = require('mongoose');

const { Schema } = mongoose;

const Team = mongoose.models.Team;
const Task = mongoose.models.Task;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
