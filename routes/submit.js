const User = require('../lib/User');
const cookieParser = require('cookie-parser');
//const options = require('./options'); 

options = {};

module.exports = {

//	options: (req) => {
	//	return {
	//		username: req.body.username,
	//		password: req.body.password
	//	}
//	},

	getMainPage: (req, res) => {		
		res.render('./index', { username: options.username });
	},

	signIn: (req, res) => {
		const username = req.body.username;
		const password = req.body.password;

		const user = new User({
			username: username,
			password: password
		});

		options.username = username;
		res.cookie('username', username);

		user.check(res, (err) => {
			if (err) throw err;
		});	
	},

	signUp: (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		const passwordAgain = req.body.passwordAgain;
		
		const user = new User({
			username: username,
			password: password
		});

		options.username = username;
		user.save(res, (err) => {
			if (err) throw err;
		});
	}

}
	
