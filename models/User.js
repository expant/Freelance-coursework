const client = require('../config/db');

class User {
  constructor(obj) {
      for (let key in obj) {
        this[key] = obj[key];
      }
  }

  getUser(req, res, cb) {
    client.query(`
      SELECT * FROM users WHERE name = '${this.username}';
    `, (err, result) => {
      if (err) throw err;
      const data = result;

      const username = result[0].name;
      const about = result[0].about;

      res.render('../views/userProfile.pug', { username, about });
    });
  }

  check(req, res, cb) {
    let query = `
      SELECT * FROM users 
      WHERE name = '${this.username}' 
      AND password = '${this.password}'
    `;

    client.query(query, (err, result) => {   
      if (err) {
        console.log(err.code);
        if (result[0].name === undefined && result[0].password === undefined) {
          res.json('Неверное имя пользователя или неверный пароль');
        }
      } else {
        if (this.username === result[0].name && this.password === result[0].password) {
          req.session.username = this.username;
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
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.json('Имя уже существует');
        } 
      } else {
        req.session.username = this.username;
        console.log(req.session.username);
        res.json(req.body);
      }  
		});
  }

  updateName(req, res, cb) {
    let query = `
      UPDATE users SET name = '${this.data}' 
      WHERE name = '${this.username}';
    `;

    client.query(query, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.json('Имя уже существует');
        }
      } else {
        req.session.username = this.newUsername;
        console.log(req.session.username);
        res.json(req.body);
      }
    });
  }

  deleteUser(req, res, cb) {
    console.log(this.username);
    client.query(`
      DELETE FROM users WHERE name = '${this.username}';
    `, (err, result) => {
      if (err) throw err;
      req.session.destroy(() => {
        res.json('Пользователь удалён');
      });
    });
  }

  addAbout(req, res, cb) {
    let query = `
      UPDATE users SET about = '${this.data}' 
      WHERE name = '${this.username}';
    `;

    client.query(query, (err, result) => {
      if (err) throw err;
      res.json(req.body);
    });
  }
}

module.exports = User;

