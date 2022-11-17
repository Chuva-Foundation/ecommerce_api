const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    database: process.env.DB_DATABASE || "e_comerce"
});


module.exports = pool;