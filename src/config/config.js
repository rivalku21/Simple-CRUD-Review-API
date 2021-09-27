require('dotenv').config({ path: ".env" });
const { Pool } = require("pg");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Connect to postgres
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const pool = new Pool({
  connectionString:isProduction ? process.env.DATABASE_URL : connectionString
});

if(pool) {
    console.log(`connected ${DB_NAME}`);
} else {
    console.log('Sorry');
}


module.exports = { pool };