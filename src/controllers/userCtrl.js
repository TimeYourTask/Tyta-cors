const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/userModel');
const Token = require('../models/tokenModel');

const { welcomeEmail, resetPasswordEmail } = require('../utils/mails');

const signUserToken = (userData, user, res) => {
  jwt.sign(
    userData,
    process.env.JWT_KEY,
    { expiresIn: '30 days' },
    (error, token) => {
      if (error) {
        res.status(500);
        res.json({ message: 'Can not generate token' });
      } else {
        res.status(200);
        res.json({
          token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        });
      }
    }
  );
};

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
        welcomeEmail(newUser.email, newUser.firstName);
        signUserToken(
          { id: newUser.id, email: newUser.email, role: newUser.role },
          newUser,
          res
        );
      })
      .catch((error) => res.status(500).json(error));
  });
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json(error));
};

exports.getOneUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json(error));
};

exports.deleteUser = (req, res) => {
  // check if user exist
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        user
          .delete()
          .then(() => res.status(200).json({ message: 'User deleted!' }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.updateUser = (req, res) => {
  // check if user exist
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        user
          .update(req.body)
          .then(() => res.status(200).json({ message: 'User updated!' }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
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

  signUserToken(userData, user, res);
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({
        message:
          'If our services find a match with the address you entered, you will receive a reset link in a few moments.',
      });
    }

    let token = await Token.findOne({ user_id: user.id });
    if (!token) {
      token = await new Token({
        user_id: user.id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token.token}&id=${token.id}`;
    await resetPasswordEmail(user.email, link);
    return res.status(200).json({
      message:
        'If our services find a match with the address you entered, you will receive a reset link in a few moments.',
    });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong!' });
  }
};

exports.checkResetToken = async (req, res) => {
  try {
    const token = await Token.findOne({
      id: req.params.token_id,
      token: req.params.token,
    });
    if (!token)
      return res
        .status(400)
        .json({ message: 'Invalid or expired link, please try again later.' });

    const user = await User.findById(token.user_id);
    if (!user)
      return res
        .status(400)
        .json({ message: 'Invalid or expired link, please try again later.' });

    user.password = req.body.password;
    await user.save();
    await token.delete();

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong!' });
  }
};
