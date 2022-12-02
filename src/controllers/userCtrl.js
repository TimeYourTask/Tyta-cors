const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/nodemailer');

exports.userRegister = (req, res) => {
  const newUser = new User(req.body);
  //check if email already exist
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }
    newUser
      .save()
      .then(() => {
        sendEmail(
          newUser.email,
          'Welcome to the app!',
          'Thank you for registering to our app!'
        );
        res.status(201).json({ message: 'User created! :', newUser });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .then(() => res.status(200).json({ message: 'User deleted!' }))
    .catch((error) =>
      res.status(400).json({ message: 'Invalid Request!', error })
    );
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    upsert: true,
  })
    .then((user) => {
      res
        .status(200)
        .json({ message: 'The user has been modified correclty!', user });
    })
    .catch((error) =>
      res.status(401).json({ message: 'Invalid Request!', error })
    );
};

exports.userLogin = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(500).json({ message: 'User not exist' });
    return;
  }

  const isValid = await user.comparePassword(req.body.password);
  if (!isValid) {
    res.status(500).json({ message: 'Invalid Password' });
    return;
  }

  const userData = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  jwt.sign(
    userData,
    process.env.JWT_KEY,
    { expiresIn: '30 days' },
    (error, token) => {
      if (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Can not generate token' });
      } else {
        res.status(200);
        res.json({ token });
      }
    }
  );
};
