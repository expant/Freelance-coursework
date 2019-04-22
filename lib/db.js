const mysql = require('mysql');

const client = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'freelance'
});

client.connect((err) => {
	if (err) throw err;
  	console.log("Connected!");

	const sqlUsers = `
		CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(20),
		password VARCHAR(20),
		age VARCHAR(2)
	);`;

	client.query(sqlUsers, (err, result) => {
		if (err) throw err;
		console.log('Table users created!');
	});

	const sqlTasks = `
		CREATE TABLE IF NOT EXISTS tasks (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(100),
			text VARCHAR(2000),
			price VARCHAR(20)
		)`;

	client.query(sqlTasks, (err, result) => {
		if (err) throw err;
		console.log('Table tasks created!');
	});
});

module.exports = client;
	
