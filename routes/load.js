const express = require('express');
const router = express.Router();
const { db, pgp } = require('../db/db');

// @route     POST api/load
// @desc      Load all app data
// @access    Private
router.get('/', async (req, res) => {
  try {
    const [floors, walls, areas, devices] = await db.multi(
      'SELECT * FROM floors;SELECT * FROM walls;SELECT * FROM areas;SELECT * FROM devices'
    );
    res.json({ floors, walls, areas, devices });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
