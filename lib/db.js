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
		name VARCHAR(10),
		password VARCHAR(10)
	);`;

	client.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Table created!');
	});
});

module.exports = client;
	
