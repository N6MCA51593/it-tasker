const express = require('express');
const router = express.Router();
const { db } = require('../db');
const generateWallQuery = require('../utils/generateWallQuery');

// @route     POST api/update/geometry
// @desc      Update geometry
// @access    Private
router.post('/geometry', async (req, res) => {
  const reducer = (accum, wall) => {
    const { x1, y1, x2, y2 } = wall.coords;
    return accum + `M ${x1} ${y1} L ${x2} ${y2}`;
  };
  const toDelete = req.query.del;
  const toUpsert = req.body;
  const floor = req.query.fl;

  try {
    const query = generateWallQuery(toUpsert, toDelete, floor);
    const walls = await db.any(query);
    const geometry = walls.reduce(reducer, '');
    await db.none('UPDATE floors SET geometry = $1 WHERE id = $2', [
      geometry,
      floor
    ]);
    res.json({ id: floor, geometry });
  } catch (error) {
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
