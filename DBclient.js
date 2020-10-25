const { Pool } = require('pg');
const { DB_USER, DB_PW, DB_HOST, DB_PORT, DB_STRING } = process.env;
const pool = new Pool({
  user: DB_USER,
  password: DB_PW,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_STRING,
  max: 20
});

module.exports = pool;
