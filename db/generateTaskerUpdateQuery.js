const { pgp } = require('./db');
const {
  taskerItemsCs,
  onConflictTaskerItems,
  taskerItemsDevicesCs
} = require('./columnSets');

const generateTaskerUpdateQuery = (toAdd, toDelete, item, ts, owner) => {
  item.createdAt = ts;
  item.lastEditedAt = ts;
  item.owner = owner;
  const toAddEntries =
    toAdd &&
    toAdd.map(deviceId => {
      return {
        deviceId,
        owner,
        itemId: item.id
      };
    });
  const cond = pgp.as.format(' WHERE EXCLUDED."owner" = $1', owner);
  const upsItemQuery =
    pgp.helpers.insert(item, taskerItemsCs) + onConflictTaskerItems + cond;
  const delDevicesQuery = toDelete
    ? {
        query:
          'DELETE FROM tasker_items_devices WHERE "deviceId" IN (${toDelete:list}) ' +
          'AND "itemId" = ${item.id} AND "owner" = ${owner}',
        values: { item, toDelete, owner }
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
