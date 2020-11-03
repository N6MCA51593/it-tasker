const express = require('express');
const router = express.Router();
const { db, pgp } = require('../db');

// @route     POST api/load
// @desc      Load all app data
// @access    Private
router.get('/', async (req, res) => {
  try {
    const [floors, walls] = await db.multi(
      'SELECT * FROM floors;SELECT * FROM walls'
    );
    res.json({ floors, walls, areas: [], devices: [] });
  } catch (error) {
    console.log(err);
  }
});

module.exports = router;
