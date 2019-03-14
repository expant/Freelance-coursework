const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: '5000',
    database: 'UssualyMan',
    user: 'UssualyMan',
    password: 'postgres'
};

const db = pgp(cn);
module.exports = db;

