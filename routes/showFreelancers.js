const Users = require('../models/Users');

module.exports = {
	showAll: (req, res) => {
		if (req.body.freelancer) {
			const freelancer = req.body.freelancer;
			const users = new Users({ freelancer });

			users.getFreelancer(req, res, (err) => {
				if (err) throw err;
			});
		} else {
			const users = new Users();

			users.showAll(req, res, err => {
				if (err) throw err;
			});
		}
	}
}