const Users = require('../models/Users');

module.exports = {
	showAll: (req, res) => {
		const users = new Users();

		users.showAll(req, res, err => {
			if (err) throw err;
		});
	}
}