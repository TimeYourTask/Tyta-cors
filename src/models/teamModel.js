const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      id: {
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
});

module.exports = mongoose.model('Team', teamSchema);
