const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const generateWallQuery = require('../db/generateWallQuery');
const generateInteractablesQuery = require('../db/generateInteractablesQuery');
const generateTaskerUpdateQuery = require('../db/generateTaskerUpdateQuery');
const generateFloorPositionUpdateQuery = require('../db/generateFloorPositionUpdateQuery');
const generateFloorUpdateQuery = require('../db/generateFloorUpdateQuery');
const generateGeometryUpdateQuery = require('../db/generateGeometryUpdateQuery');
const authMiddleware = require('../authMiddleware');

// @route     POST api/update/geometry
// @desc      Update geometry
// @access    Private
router.post('/geometry', authMiddleware, async (req, res) => {
  const { userId } = req;
  const reducer = (accum, wall) => {
    const { x1, y1, x2, y2 } = wall.coords;
    return accum + `M ${x1} ${y1} L ${x2} ${y2}`;
  };
  const toDelete = req.query.del;
  const toUpsert = req.body;
  const floors =
    req.query.fl && !Array.isArray(req.query.fl)
      ? [req.query.fl]
      : req.query.fl;

  try {
    const query = generateWallQuery(toUpsert, toDelete, floors, userId);
    const newGeometry = await db.tx(async t => {
      const walls = await t.multi(query);
      let geometries = walls
        .filter(e => e.length > 0)
        .map(floorWalls => {
          return {
            id: floorWalls[0].floor,
            geometry: floorWalls.reduce(reducer, '')
          };
        });
      if (geometries.length === 0 && floors.length !== 0) {
        geometries = floors.map(id => {
          return {
            id,
            geometry: ''
          };
        });
      }

      const geoUpdateQuery = generateGeometryUpdateQuery(geometries);
      await t.none(geoUpdateQuery);
      return geometries;
    });
    res.json(newGeometry);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     POST api/update/interactables
// @desc      Update areas and devices
// @access    Private
router.post('/interactables', authMiddleware, async (req, res) => {
  const { userId } = req;
  const toDeleteAreas = req.query.adel;
  const toDeleteDevices = req.query.ddel;
  const toUpsertAreas = req.body.areas;
  const toUpsertDevices = req.body.devices;

  try {
    const query = generateInteractablesQuery(
      toUpsertAreas,
      toDeleteAreas,
      toUpsertDevices,
      toDeleteDevices,
      userId
    );
    await db.tx(async t => await t.none(query));
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     POST api/update/task
// @desc      Update task item
// @access    Private
router.post('/task', authMiddleware, async (req, res) => {
  const { userId } = req;
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
    const query = generateTaskerUpdateQuery(toAdd, toDelete, item, ts, userId);
    await db.tx(async t => await t.none(query));
    res.json({ ts, id: item.id, name: item.name });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

// @route     POST api/update/floor
// @desc      Update floor
// @access    Private
router.post('/floor', authMiddleware, async (req, res) => {
  const { userId } = req;
  const floor = req.body;
  try {
    const floors = await db.many(
      'SELECT * FROM floors WHERE owner = $1',
      userId
    );
    const posQuery = generateFloorPositionUpdateQuery(floor, floors);
    let updatedFloors = [];
    if (posQuery) {
      updatedFloors = await db.many(posQuery);
    }

    const floorUpd = { ...floor, owner: userId };
    delete floorUpd.oldPosition;
    const floorQuery = generateFloorUpdateQuery(floorUpd);
    const floorUpdated = await db.one(floorQuery);
    updatedFloors.push(floorUpdated);

    res.send(updatedFloors);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
