const User = require('../lib/User');
const cookieParser = require('cookie-parser');
//const options = require('./options'); 

exports.options = {};

module.exports = {

//	options: (req) => {
	//	return {
	//		username: req.body.username,
	//		password: req.body.password
	//	}
//	},

	getMainPage: (req, res) => {		
		res.render('./index', { username: exports.options.username });
	},

	signIn: (req, res) => {
		const username = req.body.username;
		const password = req.body.password;

		const user = new User({
			username: username,
			password: password
		});

		exports.options.username = username;
		res.cookie('username', username);

		user.check(res, (err) => {
			if (err) throw err;
		});	
	},

	signUp: (req, res) => {
		//const username = req.body.username;
		//const password = req.body.password;
		const passwordAgain = req.body.passwordAgain;

		if (login.password == passwordAgain) {
			const user = new User({
				username: login.username,
				password: login.password
			});

			user.save((err) => {
				if (err) throw err;
			});
		
			res.redirect('/market');
		} else {
				res.redirect('back');
		}
	}

}
	
