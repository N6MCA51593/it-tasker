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
  [
    '?id',
    'area',
    '?floor',
    'coords:json',
    'name',
    'type',
    'description',
    'status'
  ],
  {
    table: 'devices'
  }
);

const onConflictDevices =
  ' ON CONFLICT(id) DO UPDATE SET ' +
  devicesCs.assignColumns({ from: 'EXCLUDED', skip: ['id', 'floor'] });

module.exports = {
  wallsCs,
  onConflictWalls,
  areasCs,
  onConflictAreas,
  devicesCs,
  onConflictDevices
};