const { pgp } = require('./db');

const generateGeometryUpdateQuery = geometries => {
  const queries = geometries.map(geo => {
    return {
      query:
        'UPDATE floors SET geometry = ${geo.geometry} WHERE id = ${geo.id}',
      values: { geo }
    };
  });

  const query = pgp.helpers.concat(queries);

  return query;
};

module.exports = generateGeometryUpdateQuery;
