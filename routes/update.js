const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const generateWallQuery = require('../db/generateWallQuery');
const generateInteractablesQuery = require('../db/generateInteractablesQuery');
const generateTaskerUpdateQuery = require('../db/generateTaskerUpdateQuery');
const e = require('express');

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
    const newGeometry = await db.tx(async t => {
      const walls = await t.any(query);
      const geometry = walls.reduce(reducer, '');
      await t.none('UPDATE floors SET geometry = $1 WHERE id = $2', [
        geometry,
        floor
      ]);
      return geometry;
    });
    res.json({ id: floor, geometry: newGeometry });
  } catch (error) {
    res.status(400).json({ error: 'Server error' });
  }
});

// @route     POST api/update/interactables
// @desc      Update areas and devices
// @access    Private
router.post('/interactables', async (req, res) => {
  const toDeleteAreas = req.query.adel;
  const toDeleteDevices = req.query.ddel;
  const toUpsertAreas = req.body.areas;
  const toUpsertDevices = req.body.devices;
  const floor = req.query.fl;
  try {
    const query = generateInteractablesQuery(
      toUpsertAreas,
      toDeleteAreas,
      toUpsertDevices,
      toDeleteDevices,
      floor
    );
    await db.tx(async t => await t.none(query));
    res.json({ test: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

// @route     POST api/update/task
// @desc      Update task item
// @access    Private
router.post('/task', async (req, res) => {
  const toAdd =
    req.query.add && !Array.isArray(req.query.add)
      ? [req.query.add]
      : req.query.add;
  const toDelete =
    req.query.del && !Array.isArray(req.query.del)
      ? [req.query.del]
      : req.query.del;
  const ts = new Date().toISOString();
  const item = req.body;

  try {
    const query = generateTaskerUpdateQuery(toAdd, toDelete, item, ts);
    await db.tx(async t => await t.none(query));
    res.json({ status: 'ok', ts, id: item.id, name: item.name });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

// @route     POST api/update/floor
// @desc      Update floor
// @access    Private
router.post('/floor', async (req, res) => {
  const floor = req.body;
  const floors = await db.many('SELECT * FROM floors');
  console.log(floors);
  const positions = floors.map(e => e.position);
  const collisionIndex = positions.indexOf(floor.position);
  let positionUpdate = [];
  if (collisionIndex !== -1 && floors[collisionIndex].id !== floor.id) {
    positionUpdate = floors.map(e => {
      if (floor.position <= e.position) {
        return { id: e.id, position: e.position + 1 };
      }
    });
  } else if (collisionIndex !== -1 && floors[collisionIndex].id === floor.id) {
    const { position, oldPosition } = floor;
    const diff = position - oldPosition;
    if (diff !== 0) {
      const direction = diff > 0 ? -1 : 1;
      positionUpdate = floors.map(e => {
        if (
          position <= e.position &&
          oldPosition > e.position &&
          direction < 0
        ) {
          return { id: e.id, position: e.position - direction };
        } else if (
          position >= e.position &&
          oldPosition < e.position &&
          direction > 0
        ) {
          return { id: e.id, position: e.position - direction };
        }
      });
    }
  }
  console.log(positionUpdate);
  try {
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
