const { pgp } = require('./db');
const {
  areasCs,
  onConflictAreas,
  devicesCs,
  onConflictDevices
} = require('./columnSets');

const generateInteractablesQuery = (
  toUpsertAreas,
  toDeleteAreas,
  toUpsertDevices,
  toDeleteDevices,
  owner
) => {
  const cond = pgp.as.format(' WHERE EXCLUDED."owner" = $1', owner);
  const toUpsertAreasFormatted = toUpsertAreas.map(e => {
    return { ...e, owner, points: `{${e.points.join(',')}}` };
  });

  const upsAreasQuery =
    toUpsertAreas.length > 0
      ? pgp.helpers.insert(toUpsertAreasFormatted, areasCs) +
        onConflictAreas +
        cond
      : '';

  const upsDevicesQuery =
    toUpsertDevices.length > 0
      ? pgp.helpers.insert(
          toUpsertDevices.map(e => {
            return { ...e, owner };
          }),
          devicesCs
        ) +
        onConflictDevices +
        cond
      : '';
  const delAreasQuery = toDeleteAreas
    ? {
        query:
          'DELETE FROM areas WHERE id IN (${toDeleteAreas:list}) AND owner = ${owner}',
        values: { toDeleteAreas, owner }
      }
    : '';
  const delDevicesQuery = toDeleteDevices
    ? {
        query:
          'DELETE FROM devices WHERE id IN (${toDeleteDevices:list}) AND owner = ${owner}',
        values: { toDeleteDevices, owner }
      }
    : '';

  const query = pgp.helpers.concat([
    upsAreasQuery,
    upsDevicesQuery,
    delAreasQuery,
    delDevicesQuery
  ]);

  return query;
};

module.exports = generateInteractablesQuery;
