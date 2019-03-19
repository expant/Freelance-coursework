const mysql = require('mysql');
const client = require('../lib/createTable');

exports.users = (req, res) => {
    client.query(`
			SELECT name FROM users;
    `, (err, result) => {
			if (err) throw err;
		});

		res.render('./freelancers');
};  