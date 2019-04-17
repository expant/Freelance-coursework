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

	const sql = `CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(20),
		password VARCHAR(20),
		age VARCHAR(2)
	);`;

	client.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Table created!');
	});
});

module.exports = client;
	
