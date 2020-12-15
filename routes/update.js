const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const generateWallQuery = require('../db/generateWallQuery');
const generateInteractablesQuery = require('../db/generateInteractablesQuery');
const generateTaskerUpdateQuery = require('../db/generateTaskerUpdateQuery');
const generateFloorPositionUpdateQuery = require('../db/generateFloorPositionUpdateQuery');
const generateFloorUpdateQuery = require('../db/generateFloorUpdateQuery');
const generateGeometryUpdateQuery = require('../db/generateGeometryUpdateQuery');

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
  const floors =
    req.query.fl && !Array.isArray(req.query.fl)
      ? [req.query.fl]
      : req.query.fl;

  try {
    const query = generateWallQuery(toUpsert, toDelete, floors);
    const newGeometry = await db.tx(async t => {
      const walls = await t.multi(query);
      const geometries = walls
        .filter(e => e.length > 0)
        .map(floorWalls => {
          return {
            id: floorWalls[0].floor,
            geometry: floorWalls.reduce(reducer, '')
          };
        });

      const geoUpdateQuery = generateGeometryUpdateQuery(geometries);
      await t.none(geoUpdateQuery);
      return geometries;
    });
    res.json(newGeometry);
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
  const posQuery = generateFloorPositionUpdateQuery(floor, floors);
  try {
    let updatedFloors = [];
    if (posQuery) {
      updatedFloors = await db.many(posQuery);
    }

    const floorUpd = { ...floor };
    delete floorUpd.oldPosition;
    const floorQuery = generateFloorUpdateQuery(floorUpd);
    const floorUpdated = await db.one(floorQuery);
    updatedFloors.push(floorUpdated);

    res.send(updatedFloors);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Server error' });
  }
});

module.exports = router;
