const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

tokenSchema.set('toJSON', {
  transform: (doc, ret) => {
    // eslint-disable-next-line no-underscore-dangle
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Token', tokenSchema);
