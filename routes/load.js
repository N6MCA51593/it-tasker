const express = require('express');
const authMiddleware = require('../authMiddleware');
const router = express.Router();
const { db, pgp } = require('../db/db');
const generateLoadQuery = require('../db/generateLoadQuery');

// @route     POST api/load
// @desc      Load all app data
// @access    Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const query = generateLoadQuery(userId, true);
    const [floors, walls, areas, devices, tasks, taskDevices] = await db.multi(
      query
    );
    res.json({ floors, walls, areas, devices, tasks, taskDevices });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
