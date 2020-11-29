const { pgp } = require('./db');
const { taskerItemsDevicesCs } = require('../db/columnSets');

const generateCheckOffQuery = updateObj => {
  const toCheckOff = { ...updateObj };
  delete toCheckOff.id;
  const updateArr = [];
  for (const prop in toCheckOff) {
    updateArr.push({
      deviceId: prop,
      itemId: updateObj.id,
      isCheckedOff: toCheckOff[prop]
    });
  }
  const query =
    pgp.helpers.update(updateArr, taskerItemsDevicesCs) +
    ' WHERE v."itemId" = t."itemId" AND v."deviceId" = t."deviceId"';
  return query;
};

module.exports = generateCheckOffQuery;
