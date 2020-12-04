const { pgp } = require('./db');
const { floorsCs } = require('./columnSets');

const generateFloorUpdateQuery = floor => {
  const condition = pgp.as.format(' WHERE id = ${id}', floor);
  const query = floor.isNew
    ? pgp.helpers.insert(floor, floorsCs) + ' RETURNING *'
    : pgp.helpers.update(floor, floorsCs) + condition + ' RETURNING *';

  return query;
};

module.exports = generateFloorUpdateQuery;
