const User = require('../models/User');

module.exports = {
    getUserProfile: (req, res) => {
		if (req.session.username) {
			const username = req.session.username;

			const user = new User({ username });
			user.getUser(req, res, (err) => {
				if (err) throw err;
			});
		} else {
			res.redirect('/sign_in');
		}	
	},
	
	changeTheData: (req, res) => {
		if (req.body.newUsername) {	

			const data = req.body.newUsername;
			const username = req.session.username;

			const user = new User({
				data,
				username
			});

			user.updateName(req, res, (err) => {
				if (err) throw err;
			});
		}
		if (req.body.about) {
			console.log(req.body.about);
			const data = req.body.about;
			const username = req.session.username;
			
			const user = new User({ data, username });

			user.addAbout(req, res, (err) => {
				if (err) throw err;
			});
		}

		if (req.body.del) {
			const username = req.session.username;
			const user = new User({ username });
			user.deleteUser(req, res, (err) => {
				if (err) throw err;
			});
		  }
	}
}

