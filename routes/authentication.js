const User = require('../lib/User');

module.exports = {

	getMainPage: (req, res) => {		
		if (req.session.username) {
			const username = req.session.username;
			res.render('index', { username });
		} else {
			res.render('index');
		}
	},

	signIn: (req, res) => {
		const dataOfUsers = {
			username: req.body.username,
			password: req.body.password
		}

		const user = new User({
			username: dataOfUsers.username,
			password: dataOfUsers.password
		});

		user.check(res, (err) => {
			if (err) throw err;
		});	
	},

	signUp: (req, res) => {

		if (!req.body) return res.sendStatus(400);

		const dataOfUsers = {
			username: req.body.username,
			password: req.body.password
		}
		
		const user = new User({
			username: dataOfUsers.username,
			password: dataOfUsers.password
		});

		user.save(req, res, (err) => {
			if (err) throw err;
		});
	},

	getUserProfile: (req, res) => {
		if (req.session.username) {
			const username = req.session.username;
			res.render('userProfile', { username });
		} else {
			res.redirect('/sign_in');
		}
		
  }		
}
	
