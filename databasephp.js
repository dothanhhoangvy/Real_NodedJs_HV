const mysql = require("mysql");
require('dotenv').config();

host = process.env.DB_HOST;
user= process.env.DB_USER;
password=process.env.DB_PASSWORD;
database=process.env.DB_DATABASE;

const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: process.env.DB_DATABASE
})
module.exports = db;