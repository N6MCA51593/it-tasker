const express = require('express');
const router = express.Router();
const { db } = require('../db/db');

// @route     DELETE api/delete/task
// @desc      Delete tasker item
// @access    Private
router.delete('/task', async (req, res) => {
  const id = req.query.id;
  try {
    await db.none(`DELETE FROM tasker_items WHERE id = '${id}'`);
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
