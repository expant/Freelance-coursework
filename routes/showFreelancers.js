const Users = require('../lib/Users');

module.exports = {
	showAll: (req, res) => {
		const users = new Users();

		users.showAll(res, err => {
			if (err) throw err;
		});
	}
}