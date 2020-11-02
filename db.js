const pgp = require('pg-promise')({ capSQL: true });
const { DB_USER, DB_PW, DB_HOST, DB_PORT, DB_STRING } = process.env;
const cn = {
  user: DB_USER,
  password: DB_PW,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_STRING,
  max: 20
};

const db = pgp(cn);

module.exports = { db, pgp };
