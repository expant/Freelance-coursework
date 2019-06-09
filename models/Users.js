const client = require('../config/db');

class Users {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  showAll(req, res, cb) {
		let query = `
			SELECT * FROM	users;
		`;

		client.query(query, (err, result) => {
      if (err) throw err;
      const username = req.session.username;
			res.render('../views/freelancers.pug', { 
        freelancers: result,
        username
      });
		});
  }

  getFreelancer(req, res, cb) {
    client.query(`
      SELECT * FROM users WHERE name = '${this.freelancer}';
    `, (err, result) => {
      if (err) throw err;
      const name = result[0].name;
      const about = result[0].about;

      res.json({ name, about });
    });
  }
}

module.exports = Users;