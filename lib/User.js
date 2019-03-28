const client = require('./db');

class User {
  constructor(obj) {
      for (let key in obj) {
        this[key] = obj[key];
      }
  }

  check(res, cb) {
    client.query(`
      SELECT * FROM users WHERE name = '${this.username}' AND password = '${this.password}';
    `, (err, result) => {
      if (err) throw err;

      if (this.username === result[0].name && this.password === result[0].password) {
				res.redirect('/');
			} 
		});  
				
		client.end((err) => {
			if (err) throw err;
		});
  }

  save(cb) {
		client.query(`
			INSERT INTO users (name, password) VALUES ('${this.username}', '${this.password}'); 
		`, (err, result) => {
			if (err) throw err;
		});

		client.end((err) => {
			if (err) throw err;
		});
  }
}

module.exports = User;

