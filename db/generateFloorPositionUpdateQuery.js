const { pgp } = require('./db');
const { floorsCs } = require('../db/columnSets');

const generateFloorPositionUpdateQuery = (floor, floors) => {
  const { position, oldPosition, id, isNew } = floor;
  const diff = !!(position - oldPosition);
  let positionUpdate = [];

  if (diff && isNew) {
    positionUpdate = floors.map(e => {
      if (position <= e.position) {
        return { id: e.id, position: e.position + 1 };
      }
    });
  } else if (diff && !isNew) {
    const direction = diff > 0 ? -1 : 1;
    positionUpdate = floors.map(e => {
      if (
        position >= e.position &&
        oldPosition < e.position &&
        direction < 0 &&
        e.id !== id
      ) {
        return { id: e.id, position: e.position + direction };
      } else if (
        position <= e.position &&
        oldPosition > e.position &&
        direction > 0 &&
        e.id !== id
      ) {
        return { id: e.id, position: e.position + direction };
      }
    });
  }

  const positionUpdateFiltered = positionUpdate.filter(e => e);
  const values =
    positionUpdateFiltered.length > 0
      ? pgp.helpers.values(positionUpdateFiltered, ['id', 'position'])
      : '';
  const query =
    positionUpdateFiltered.length > 0
      ? `UPDATE "floors" AS t SET "position" = v."position" FROM (VALUES${values}) ` +
        `AS v("id","position") WHERE v.id = t.id RETURNING *`
      : ``;

  return query;
};

module.exports = generateFloorPositionUpdateQuery;
