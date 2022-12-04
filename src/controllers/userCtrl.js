const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/userModel');
const Token = require('../models/tokenModel');

const sendEmail = require('../utils/nodemailer');

exports.userRegister = (req, res) => {
  const newUser = new User(req.body);
  // Check if email already exist
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: 'User already exist',
      });
    }
    return newUser
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

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({
        message:
          'We have sent an email to this address, if it exists in our data we invite you to look in a few moments.',
      });
    }

    let token = await Token.findOne({ user_id: user.id });
    if (!token) {
      token = await new Token({
        user_id: user.id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token.token}&id=${user.id}`;
    await sendEmail(user.email, 'Password Reset', link);
    return res.status(200).json({
      message:
        'We have sent an email to this address, if it exists in our data we invite you to look in a few moments.',
    });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong!' });
  }
};

exports.checkResetToken = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user)
      return res.status(400).json({ message: 'Invalid link or expired' });

    const token = await Token.findOne({
      user_id: user.id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).json({ message: 'Invalid link or expired' });

    user.password = req.body.password;
    await user.save();
    await token.delete();

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong!' });
  }
};
