const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const generateCheckOffQuery = require('../db/generateCheckOffQuery');

// @route     POST api/check-off/devices
// @desc      Check off task devices
// @access    Private
router.post('/devices', async (req, res) => {
  try {
    const query = generateCheckOffQuery(req.body);
    await db.none(query);
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
