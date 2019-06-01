const User = require('../models/User');

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

		user.check(req, res, (err) => {
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
	}
}
	
