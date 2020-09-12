const { Pool, Client } = require('pg');

module.exports.pool = new Pool({
  user: 'insertNameOfUser',
  host: 'localhost',
  database: 'nameOfDB',
  port: '5432',
});

// mirror the pool. 
module.exports.client = new Client({
  user: '',
  host: '',
  database: '',
  // 5432 is the default port for Postgres
  port: '5432',
});