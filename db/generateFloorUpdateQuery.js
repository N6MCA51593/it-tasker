const { pgp } = require('./db');
const { floorsCs } = require('./columnSets');

const generateFloorUpdateQuery = floor => {
  const condition = pgp.as.format(' WHERE id = ${id}', floor);
  const query =
    pgp.helpers.update(floor, floorsCs) + condition + ' RETURNING *';
  console.log(query);

  return query;
};

module.exports = generateFloorUpdateQuery;
