const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
});

// Pre save to hash password
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => next(error));
});

userSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update.password) {
    return bcrypt
      .hash(update.password, 10)
      .then((hash) => {
        update.password = hash;
        this.setUpdate(update);
      })
      .catch((error) => error);
  }
  return true;
});

module.exports = mongoose.model('User', userSchema);
