const { pgp } = require('./db');
const { wallsCs, onConflictWalls } = require('./columnSets');

const generateWallQuery = (toUpsert, toDelete, floors) => {
  const upsQuery =
    toUpsert.length > 0
      ? pgp.helpers.insert(toUpsert, wallsCs) + onConflictWalls
      : '';

  const delQuery = toDelete
    ? { query: 'DELETE FROM walls WHERE id IN ($1:list)', values: [toDelete] }
    : '';

  const selectQueries = floors.map(floor => {
    return {
      query: 'SELECT FROM walls WHERE floor = $1',
      values: floor
    };
  });

  const query = pgp.helpers.concat([upsQuery, delQuery, ...selectQueries]);

  return query;
};

module.exports = generateWallQuery;
