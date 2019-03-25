const User = require('../lib/User');

exports.signIn = (req, res) => {
    const username = req.body.username;
		const password = req.body.password;

		const user = new User({
			username: username,
			password: password
		})

		user.check((err) => {
			if (err) throw err;

		});

		res.redirect('/market');
		
};

exports.signUp = (req, res) => {
	
};