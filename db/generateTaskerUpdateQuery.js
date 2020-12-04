const { pgp } = require('./db');
const {
  taskerItemsCs,
  onConflictTaskerItems,
  taskerItemsDevicesCs
} = require('./columnSets');

const generateTaskerUpdateQuery = (toAdd, toDelete, item, ts) => {
  item.createdAt = ts;
  item.lastEditedAt = ts;
  const toAddEntries =
    toAdd &&
    toAdd.map(deviceId => {
      return {
        deviceId,
        itemId: item.id
      };
    });
  const upsItemQuery =
    pgp.helpers.insert(item, taskerItemsCs) + onConflictTaskerItems;
  const delDevicesQuery = toDelete
    ? {
        query: 'DELETE FROM tasker_items_devices WHERE "deviceId" IN (${toDelete:list}) AND "itemId" = ${item.id}',
        values: {item, toDelete}
      }
    : '';
  const insertDevicesQuery = toAddEntries
    ? pgp.helpers.insert(toAddEntries, taskerItemsDevicesCs)
    : '';

  const query = pgp.helpers.concat([
    upsItemQuery,
    insertDevicesQuery,
    delDevicesQuery
  ]);

  return query;
};

module.exports = generateTaskerUpdateQuery;
