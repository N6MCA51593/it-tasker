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
  floor
) => {
  const toUpsertAreasFormatted = toUpsertAreas.map(e => {
    return { ...e, points: `{${e.points.join(',')}}` };
  });

  const upsAreasQuery =
    toUpsertAreas.length > 0
      ? pgp.helpers.insert(toUpsertAreasFormatted, areasCs) + onConflictAreas
      : '';

  const upsDevicesQuery =
    toUpsertDevices.length > 0
      ? pgp.helpers.insert(toUpsertDevices, devicesCs) + onConflictDevices
      : '';
  const delAreasQuery = toDeleteAreas
    ? {
        query: 'DELETE FROM areas WHERE id IN ($1:list)',
        values: [toDeleteAreas]
      }
    : '';
  const delDevicesQuery = toDeleteDevices
    ? {
        query: 'DELETE FROM devices WHERE id IN ($1:list)',
        values: [toDeleteDevices]
      }
    : '';

  const query = pgp.helpers.concat([
    upsAreasQuery,
    upsDevicesQuery,
    delAreasQuery,
    delDevicesQuery
  ]);

  console.log(query);
  return query;
};

module.exports = generateInteractablesQuery;
