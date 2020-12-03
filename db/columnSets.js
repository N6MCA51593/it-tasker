const { pgp } = require('./db');

const wallsCs = new pgp.helpers.ColumnSet(['?id', '?floor', 'coords:json'], {
  table: 'walls'
});

const onConflictWalls =
  ' ON CONFLICT(id) DO UPDATE SET ' +
  wallsCs.assignColumns({ from: 'EXCLUDED', skip: ['id', 'floor'] });

const areasCs = new pgp.helpers.ColumnSet(
  ['?id', 'points:list', 'name', 'labelCoords:json', '?floor'],
  {
    table: 'areas'
  }
);

const onConflictAreas =
  ' ON CONFLICT(id) DO UPDATE SET ' +
  areasCs.assignColumns({ from: 'EXCLUDED', skip: ['id', 'floor'] });

const devicesCs = new pgp.helpers.ColumnSet(
  ['?id', 'area', '?floor', 'x', 'y', 'name', 'type', 'description', 'status'],
  {
    table: 'devices'
  }
);

const onConflictDevices =
  ' ON CONFLICT(id) DO UPDATE SET ' +
  devicesCs.assignColumns({ from: 'EXCLUDED', skip: ['id', 'floor'] });

const taskerItemsCs = new pgp.helpers.ColumnSet(
  [
    '?id',
    'name',
    'type',
    { name: 'description', def: '' },
    { name: 'createdAt', def: new Date().toISOString() },
    { name: 'lastEditedAt', def: new Date().toISOString() },
    { name: 'isCheckedOff', def: false }
  ],
  {
    table: 'tasker_items'
  }
);

const onConflictTaskerItems =
  ' ON CONFLICT(id) DO UPDATE SET ' +
  taskerItemsCs.assignColumns({
    from: 'EXCLUDED',
    skip: ['id', 'type', 'createdAt', 'isCheckedOff']
  });

const taskerItemsDevicesCs = new pgp.helpers.ColumnSet(
  ['?deviceId', '?itemId', { name: 'isCheckedOff', def: false }],
  {
    table: 'tasker_items_devices'
  }
);

const floorsCs = new pgp.helpers.ColumnSet(
  ['?id', 'geometry', 'position', 'name', 'shortName'],
  {
    table: 'floors'
  }
);

module.exports = {
  wallsCs,
  onConflictWalls,
  areasCs,
  onConflictAreas,
  devicesCs,
  onConflictDevices,
  taskerItemsCs,
  onConflictTaskerItems,
  taskerItemsDevicesCs,
  floorsCs
};
