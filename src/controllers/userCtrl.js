const User = require("../models/userModel");

exports.userRegister = (req, res) => {
  let newUser = new User(req.body);
  newUser
    .save()
    .then(() => res.status(201).json({ message: "User Created! :", newUser }))
    .catch((error) => res.status(500).json({ error }));
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params._id })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params._id)
    .then(() => res.status(200).json({ message: "User deleted!" }))
    .catch((error) =>
      res.status(400).json({ message: "Invalid Request!", error })
    );
};
