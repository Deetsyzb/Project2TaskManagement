const Pool = require("pg").Pool;

const pool = new Pool({
  user: "dshawnn",
  password: "123456",
  host: "localhost",
  port :5432,
  database: "scrummydb"
});

module.exports = pool;