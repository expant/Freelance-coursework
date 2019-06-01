const User = require('../models/User');

module.exports = {
  getUserProfile: (req, res) => {
		if (req.session.username) {
			const username = req.session.username;
			res.render('userProfile', { username });
		} else {
			res.redirect('/sign_in');
		}	
	},
	
	changeTheData: (req, res) => {
		if (req.body.newUsername) {	

			const newUsername = req.body.newUsername;
			const username = req.session.username;

			const user = new User({
				newUsername,
				username
			});

			user.update(req, res, (err) => {
				if (err) throw err;
			});
		}
	}
}
