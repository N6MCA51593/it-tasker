const { pgp } = require('./db');
const { wallsCs, onConflictWalls } = require('./columnSets');

const generateWallQuery = (toUpsert, toDelete, floor) => {
  const upsQuery =
    toUpsert.length > 0
      ? pgp.helpers.insert(toUpsert, wallsCs) + onConflictWalls
      : '';

  const delQuery = toDelete
    ? { query: 'DELETE FROM walls WHERE id IN ($1:list)', values: [toDelete] }
    : '';

  const query = pgp.helpers.concat([
    upsQuery,
    delQuery,
    { query: 'SELECT * FROM walls WHERE floor = $1', values: [floor] }
  ]);

  return query;
};

module.exports = generateWallQuery;
