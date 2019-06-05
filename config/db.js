const mysql = require('mysql');

const client = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : 'freelance',
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
			UNIQUE (name)
	);`;

	client.query(sqlUsers, (err, result) => {
		if (err) throw err;
		console.log('Table users created!');
	});

	const sqlTasks = `
		CREATE TABLE IF NOT EXISTS tasks (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(50),
			text VARCHAR(2000),
			price VARCHAR(20),
			user_id INT,
			FOREIGN KEY (user_id) 
				REFERENCES users (id) ON DELETE CASCADE
		)`;

	client.query(sqlTasks, (err, result) => {
		if (err) throw err;
		console.log('Table tasks created!');
	});

	const sqlRequests = `
		CREATE TABLE IF NOT EXISTS requests (
			id INT AUTO_INCREMENT PRIMARY KEY,
			employer VARCHAR(20),
			worker VARCHAR(20),
			task_id VARCHAR(50),
			FOREIGN KEY (employer) 
				REFERENCES users (name) ON DELETE CASCADE,
			FOREIGN KEY (worker) 
				REFERENCES users (name) ON DELETE CASCADE,
			FOREIGN KEY (task_id) 
				REFERENCES tasks (title) ON DELETE CASCADE
	);`;

	client.query(sqlRequests, (err, result) => {
		if (err) throw err;
		console.log('Table requests created!');
	});
});

module.exports = client;
