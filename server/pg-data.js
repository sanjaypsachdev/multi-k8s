const keys = require('./keys');
// Postgres Client Setup
const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

module.exports.getAllValues = function () {
  return pgClient.query("SELECT * FROM values");
}

module.exports.insertValue = function (index) {
  pgClient.query('INSERT INTO values (number) VALUES ($1)', [index]);
}