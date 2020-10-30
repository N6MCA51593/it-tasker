const express = require('express');
const router = express.Router();

// @route     POST api/update/geometry
// @desc      Update geometry
// @access    Private
router.post('/geometry', async (req, res) => {
  console.log(req.body);
  res.json({ test: 'ok' });
});

module.exports = router;
