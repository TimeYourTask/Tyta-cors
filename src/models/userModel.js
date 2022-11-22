const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

let userSchema = new Schema({
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
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "ROLE_USER",
  },
});

// Pre save to hash password
userSchema.pre("save", function preSave(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = mongoose.model("User", userSchema);
