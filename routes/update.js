const express = require('express');
const router = express.Router();
const { db, pgp } = require('../db');

// @route     POST api/update/geometry
// @desc      Update geometry
// @access    Private
router.post('/geometry', async (req, res) => {
  const toUpsert = req.body;
  if (toUpsert && toUpsert.length > 0) {
    try {
      console.log(toUpsert);
      const q =
        pgp.helpers.insert(toUpsert, ['id', 'coords', 'floor'], 'walls') +
        ' on conflict (id) do update set coords=excluded.coords';
      console.log(q);
      await db.none(q);
    } catch (error) {
      console.log(error);
    }
  }
  res.json({ test: 'ok' });
});

module.exports = router;
