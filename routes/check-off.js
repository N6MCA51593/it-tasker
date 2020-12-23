const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const generateCheckOffQuery = require('../db/generateCheckOffQuery');
const authMiddleWare = require('../authMiddleware');

// @route     POST api/check-off/devices
// @desc      Check off task devices
// @access    Private
router.post('/devices', authMiddleWare, async (req, res) => {
  try {
    const query = generateCheckOffQuery(req.body);
    await db.none(query);
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

// @route     POST api/check-off/task
// @desc      Check off task task
// @access    Private
router.post('/task', async (req, res) => {
  const id = req.query.id;
  try {
    const item = await db.one(`SELECT * FROM tasker_items WHERE id = '${id}'`);
    if (item.type === 'task') {
      if (item.isCheckedOff) {
        await db.none(
          `UPDATE tasker_items SET "isCheckedOff" = false WHERE id = '${id}'`
        );
      } else {
        await db.tx(async t => {
          await t.none(
            `UPDATE tasker_items_devices SET "isCheckedOff" = true WHERE 'itemId' = '${id}' AND "isCheckedOff" = false`
          );
          await t.none(
            `UPDATE tasker_items SET "isCheckedOff" = true WHERE id = '${id}'`
          );
        });
      }
    } else {
      await db.none(
        `UPDATE tasker_items SET "isCheckedOff" = ${!item.isCheckedOff} WHERE id = '${id}'`
      );
    }
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
