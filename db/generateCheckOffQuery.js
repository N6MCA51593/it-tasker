const { pgp } = require('./db');
const {
  taskerItemsDevicesCs,
  taskerItemsDevicesCheckOffCs
} = require('../db/columnSets');

const generateCheckOffQuery = (updateObj, owner) => {
  const toCheckOff = { ...updateObj };
  delete toCheckOff.id;
  const updateArr = [];
  for (const prop in toCheckOff) {
    updateArr.push({
      deviceId: prop,
      itemId: updateObj.id,
      isCheckedOff: toCheckOff[prop],
      owner
    });
  }
  const cond = pgp.as.format(
    ' WHERE v."itemId" = t."itemId" AND v."deviceId" = t."deviceId" AND t.owner::text = $1',
    owner
  );
  const query =
    pgp.helpers.update(updateArr, taskerItemsDevicesCheckOffCs) + cond;
  return query;
};

module.exports = generateCheckOffQuery;
