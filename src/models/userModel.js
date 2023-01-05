const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ROLES } = require('../config/global');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists in database!'],
      lowercase: true,
      trim: true,
      required: [true, 'Email not provided'],
      validate: {
        validator(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: Number,
      enum: ROLES,
      default: ROLES.user,
    },
  },
  { timestamps: true }
);

// remove __v from response
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    // eslint-disable-next-line no-underscore-dangle
    delete ret.__v;
    return ret;
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

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

module.exports = mongoose.model('User', userSchema);
