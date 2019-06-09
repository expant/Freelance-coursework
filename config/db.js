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
			about VARCHAR(1000),
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
			employer INT,
			worker INT,
			task_id INT,
			FOREIGN KEY (employer) 
				REFERENCES users (id) ON DELETE CASCADE,
			FOREIGN KEY (worker) 
				REFERENCES users (id) ON DELETE CASCADE,
			FOREIGN KEY (task_id) 
				REFERENCES tasks (id) ON DELETE CASCADE
	);`;

	client.query(sqlRequests, (err, result) => {
		if (err) throw err;
		console.log('Table requests created!');
	});

	const sqlDialog = `
		CREATE TABLE IF NOT EXISTS dialogs (
			id INT AUTO_INCREMENT PRIMARY KEY,
			user1_id INT,
			user2_id INT,
			message VARCHAR(100),
			request_id INT,
			time VARCHAR(50),
			FOREIGN KEY (user1_id) 
				REFERENCES users (id) ON DELETE CASCADE,
			FOREIGN KEY (user2_id) 
				REFERENCES users (id) ON DELETE CASCADE,
			FOREIGN KEY (request_id) 
				REFERENCES requests (id) ON DELETE CASCADE
		);`;

		client.query(sqlDialog, (err, result) => {
			if (err) throw err;
			console.log('Table dialogs created!');
		});
});

module.exports = client;
