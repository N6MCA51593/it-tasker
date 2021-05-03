const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { db } = require('../db/db');
const { nanoid } = require('nanoid');

// @route     Get api/auth/
// @desc      Check if user session exists
// @access    Public
router.get('/', (req, res) => {
  res.json(req.session.user);
});

// @route     POST api/auth/signup
// @desc      Register new account
// @access    Public
router.post('/signup', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const areCredsValid = validateCredentials(userName, password);
    if (!areCredsValid) {
      return res.status(400).json({
        msg:
          'Invalid username or password format ( 3-15 characters a-z A-Z 0-9 special symbols)'
      });
    }

    const doesAlreadyExist = await db.oneOrNone(
      'SELECT * FROM users WHERE username=$1',
      userName
    );
    if (doesAlreadyExist) {
      return res.status(400).json({
        msg: 'User with this username already exists'
      });
    }

    const pwHashed = await bcrypt.hash(password, 8);
    const newUser = await db.tx(async t => {
      const newUser = await t.one(
        'INSERT INTO users(username, password) VALUES(${userName}, ${pwHashed}) RETURNING *',
        { userName, pwHashed }
      );
      const newFloor = {
        id: nanoid(),
        name: 'Level 1',
        shortName: '1',
        position: 1,
        owner: newUser.id
      };
      await t.none(
        'INSERT INTO floors(id, name, "shortName", position, owner) VALUES(${id}, ${name}, ${shortName}, ${position}, ${owner})',
        newFloor
      );
      return newUser;
    });

    const sessionUser = { id: newUser.id, userName: newUser.username };
    req.session.user = sessionUser;
    res.json(sessionUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     POST api/auth/login
// @desc      Log in the user with credentials
// @access    Public
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await db.oneOrNone(
      'SELECT * FROM users WHERE username = $1',
      userName
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      const sessionUser = { id: user.id, userName: user.username };
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } else {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     POST api/auth/logout
// @desc      Log the user out
// @access    Private
router.post('/logout', async (req, res) => {
  try {
    req.session.destroy(error => {
      if (error) throw error;
      res.clearCookie(process.env.SESSION_NAME);
      return res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

router.post('/change-password', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const pwHashed = await bcrypt.hash(password, 8);
    await db.none('UPDATE users SET password = $2 WHERE username = $1', [
      userName,
      pwHashed
    ]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;

const validateCredentials = (userName, password) => {
  const re = /^[a-zA-Z0-9*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|\\]{3,16}$/m;
  return re.test(userName) && re.test(password);
};
