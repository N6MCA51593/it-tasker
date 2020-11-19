const express = require('express');
const router = express.Router();
const { db, pgp } = require('../db/db');

// @route     POST api/load
// @desc      Load all app data
// @access    Private
router.get('/', async (req, res) => {
  try {
    const taskerQuery =
      'SELECT t1."deviceId", t1."itemId", ' +
      't1."isCheckedOff", devices.floor from devices ' +
      'INNER JOIN tasker_items_devices t1 ' +
      'ON t1."deviceId" = devices.id INNER JOIN tasker_items ' +
      'ON t1."itemId" = tasker_items.id';
    const [floors, walls, areas, devices, tasks, taskDevices] = await db.multi(
      'SELECT * FROM floors;SELECT * FROM walls;SELECT * FROM areas;' +
        'SELECT * FROM devices;SELECT * FROM tasker_items;' +
        taskerQuery
    );

    res.json({ floors, walls, areas, devices, tasks, taskDevices });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
