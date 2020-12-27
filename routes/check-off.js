const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const generateCheckOffQuery = require('../db/generateCheckOffQuery');
const authMiddleware = require('../authMiddleware');

// @route     POST api/check-off/devices
// @desc      Check off task devices
// @access    Private
router.post('/devices', authMiddleware, async (req, res) => {
  const { userId } = req;
  try {
    const query = generateCheckOffQuery(req.body, userId);
    await db.none(query);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     POST api/check-off/task
// @desc      Check off task
// @access    Private
router.post('/task', authMiddleware, async (req, res) => {
  const owner = req.userId;
  const id = req.query.id;
  try {
    const item = await db.one(
      'SELECT * FROM tasker_items WHERE id = ${id} and owner = ${owner}',
      { id, owner }
    );
    if (item.type === 'task') {
      if (item.isCheckedOff) {
        await db.none(
          'UPDATE tasker_items SET "isCheckedOff" = false WHERE id = $1',
          id
        );
      } else {
        await db.tx(async t => {
          await t.none(
            'UPDATE tasker_items_devices SET "isCheckedOff" = true WHERE "itemId" = $1 AND "isCheckedOff" = false',
            id
          );
          await t.none(
            'UPDATE tasker_items SET "isCheckedOff" = true WHERE id = $1',
            id
          );
        });
      }
    } else if (item) {
      await db.none(
        'UPDATE tasker_items SET "isCheckedOff" = ${isCheckedOff} WHERE id = ${id}',
        { id, isCheckedOff: !item.isCheckedOff }
      );
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
