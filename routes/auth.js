const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { db } = require('../db/db');
const session = require('express-session');

// @route     POST api/auth/signup
// @desc      Register new account
// @access    Public
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username.length > 20 || password.length > 20) {
      return res.status(400).json({
        msg: 'Username or password length exceed maximum length (20)'
      });
    }

    const doesAlreadyExist = await db.oneOrNone(
      'SELECT * FROM users WHERE username=$1',
      username
    );
    if (doesAlreadyExist) {
      return res.status(400).json({
        msg: 'User with this username already exists'
      });
    }
    const pwHashed = await bcrypt.hash(password, 8);
    const newUser = await db.one(
      'INSERT INTO users(username, password) VALUES(${username}, ${pwHashed}) RETURNING *',
      { username, pwHashed }
    );
    const sessionUser = { id: newUser.id, username: newUser.username };
    req.session.user = sessionUser;
    res.json(sessionUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

// @route     POST api/auth/login
// @desc      Log in the user with credentials
// @access    Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.oneOrNone(
      'SELECT * FROM users WHERE username = $1',
      username
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      const sessionUser = { id: user.id, username: user.username };
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } else {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

// @route     POST api/auth/logout
// @desc      Log the user out
// @access    Private
router.post('/logout', async (req, res) => {
  try {
    const user = req.session.user;
    session.destroy(error => {
      if (error) throw error;
      res.clearCookie(process.env.SESSION_NAME);
      res.send(user);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
