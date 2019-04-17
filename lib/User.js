const client = require('./db');

class User {
  constructor(obj) {
      for (let key in obj) {
        this[key] = obj[key];
      }
  }

  check(res, cb) {

    let query = `
      SELECT * FROM users 
      WHERE name = '${this.username}' 
      AND password = '${this.password}'
    `;

    client.query(query, (err, result) => {

      if (err) {
        res.redirect('/');
      }

      if (this.username === result[0].name && this.password === result[0].password) {
        res.redirect('/');
      } 
     
		});  
				
		client.end((err) => {
			if (err) throw err;
		});
  }

  save(res, cb) {

    let query = `
      INSERT INTO users (name, password) 
      VALUES ('${this.username}', '${this.password}'); 
    `;

		client.query(query, (err, result) => {
      if (err) throw err; 
      res.redirect('/');
		});

		client.end((err) => {
			if (err) throw err;
		});
  }
}

module.exports = User;

