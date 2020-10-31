const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../DBclient');

// @route     POST api/update/geometry
// @desc      Update geometry
// @access    Private
router.post('/geometry', async (req, res) => {
  console.log(req.body);
  res.json({ test: 'ok' });
});

module.exports = router;
