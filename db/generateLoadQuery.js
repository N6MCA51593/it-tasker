const { pgp } = require('./db');

const generateLoadQuery = (owner, isFloor) => {
  const taskerDevicesQuery = pgp.as.format(
    'SELECT t1."deviceId", t1."itemId", t1."isCheckedOff", t1."addedAt", t2.floor FROM ' +
      'devices t2 INNER JOIN tasker_items_devices t1 ON t1."deviceId" = t2.id ' +
      'AND t1.owner = $1 AND t1.owner = t2.owner ' +
      'INNER JOIN tasker_items t3 ON t1."itemId" = t3.id AND t1.owner = t3.owner;',
    owner
  );

  const floorQuery = isFloor
    ? pgp.as.format('SELECT * FROM floors WHERE owner = $1;', owner)
    : '';

  const restQuery = pgp.as.format(
    'SELECT * FROM walls WHERE owner = $1;SELECT * FROM areas WHERE owner = $1;' +
      'SELECT * FROM devices WHERE owner = $1;SELECT * FROM tasker_items WHERE owner = $1;',
    owner
  );

  const query = floorQuery + restQuery + taskerDevicesQuery;
  return query;
};

module.exports = generateLoadQuery;
