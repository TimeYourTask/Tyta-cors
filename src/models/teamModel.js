/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { ROLES } = require('../config/global');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: {
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
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: true,
  }
);

teamSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

teamSchema.pre('findOneAndDelete', async function (next) {
  const {
    _id: { _id, req },
  } = this._conditions;

  await mongoose.models.Team.findById(_id).then((team) => {
    if (team) {
      const isUserInTeamAndAdmin = team.users.some(
        (user) => user.user.toString() === req.userId && user.role === 'admin'
      );
      if (!isUserInTeamAndAdmin && req.role !== ROLES.admin) {
        return next(new Error('Access denied!'));
      }
    }
  });

  next();
});

module.exports = mongoose.model('Team', teamSchema);
