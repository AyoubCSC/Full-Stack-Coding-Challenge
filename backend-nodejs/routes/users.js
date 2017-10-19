const express = require('express');
const router = express.Router();
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({ success: false, msg: 'User ready exist' });
    } else {
      User.addUser(newUser, (err, user) => {
        if (err) {
          console.log(err)
          res.json({ success: false, msg: 'Failed to register user' });
        } else {
          console.log(user)
          res.json({ success: true, msg: 'User registered' });
        }
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.json({
          success: true,
          user: {
            id: user._id,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

module.exports = router;
