const express = require('express');
const authMiddleware = require('../authMiddleware');
const router = express.Router();
const { db } = require('../db/db');
const generateLoadQuery = require('../db/generateLoadQuery');

// @route     DELETE api/delete/task
// @desc      Delete tasker item
// @access    Private
router.delete('/task', authMiddleware, async (req, res) => {
  const id = req.query.id;
  const owner = req.userId;
  try {
    await db.none(
      'DELETE FROM tasker_items WHERE id = ${id} AND owner = ${owner}',
      { id, owner }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     DELETE api/delete/floor
// @desc      Delete floor
// @access    Private
router.delete('/floor', authMiddleware, async (req, res) => {
  const id = req.query.id;
  const owner = req.userId;
  try {
    const allFloors = await db.manyOrNone(
      'SELECT * FROM floors WHERE owner = $1',
      owner
    );
    if (allFloors.length > 1) {
      const floors = await db.tx(async t => {
        const deletedFloor = await t.one(
          'DELETE FROM floors WHERE id = ${id} AND owner = ${owner} RETURNING *',
          { id, owner }
        );
        const updatedFloors = await t.manyOrNone(
          'UPDATE floors SET position = position - 1 WHERE owner = ${owner} AND position > ${pos} RETURNING *',
          { pos: deletedFloor.position, owner }
        );
        return updatedFloors;
      });

      const query = generateLoadQuery(owner, false);
      const [walls, areas, devices, tasks, taskDevices] = await db.multi(query);

      res.json({
        deletedFloorId: id,
        floors,
        walls,
        areas,
        devices,
        tasks,
        taskDevices
      });
    } else {
      throw new Error('Cannot delete the only floor');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
