const client = require('../config/db');

class Users {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  showAll(req, res, cb) {
		let query = `
			SELECT id,name FROM	users;
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
}

module.exports = Users;