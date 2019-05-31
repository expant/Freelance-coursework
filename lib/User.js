const client = require('./db');

class User {
  constructor(obj) {
      for (let key in obj) {
        this[key] = obj[key];
      }
  }

  check(req, res, cb) {
    let query = `
      SELECT * FROM users 
      WHERE name = '${this.username}' 
      AND password = '${this.password}'
    `;

    client.query(query, (err, result) => {
      if (err) throw err;
      
        if (result[0].name === undefined && result[0].password === undefined) {
          res.json({
            error: 'Данные отсутствуют'
          });
        } else {
          if (this.username === result[0].name && this.password === result[0].password) {
            res.json(req.body);
          }
        }
    });     
  }

  save(req, res, cb) {
    let query = `
      INSERT INTO users (name, password) 
      VALUES ('${this.username}', '${this.password}'); 
    `;

		client.query(query, (err, result) => {
      if (err) throw err;
      req.session.username = this.username;
      console.log(req.session.username);
			res.json(req.body);
		});
  }

  update(req, res, cb) {
    let query = `
      UPDATE users SET name = '${this.username}' 
      WHERE name = '${this.username}';
    `;

    client.query(query, (err, result) => {
      if (err) throw err;
      res.json(req.body);
    });
  }

  /*getName(res, cb) {
    let query = `
      SELECT name FROM users
      WHERE name = '${this.username}';
    `


  }*/
}

module.exports = User;

