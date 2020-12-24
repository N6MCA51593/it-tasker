const { pgp } = require('./db');
const { wallsCs, onConflictWalls } = require('./columnSets');

const generateWallQuery = (toUpsert, toDelete, floors, owner) => {
  const cond = pgp.as.format(' WHERE EXCLUDED."owner" = $1', owner);
  const upsQuery =
    toUpsert.length > 0
      ? pgp.helpers.insert(
          toUpsert.map(e => {
            return { ...e, owner };
          }),
          wallsCs
        ) +
        onConflictWalls +
        cond
      : '';

  const delQuery = toDelete
    ? {
        query:
          'DELETE FROM walls WHERE id IN (${toDelete:list}) AND owner = ${owner}',
        values: { toDelete, owner }
      }
    : '';

  const selectQueries = floors.map(floor => {
    return {
      query: 'SELECT * FROM walls WHERE floor = ${floor} AND owner = ${owner}',
      values: { floor, owner }
    };
  });

  const query = pgp.helpers.concat([upsQuery, delQuery, ...selectQueries]);

  return query;
};

module.exports = generateWallQuery;
