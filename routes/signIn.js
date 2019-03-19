const User = require('../lib/User');

exports.submit = (req, res) => {
    const username = req.body.username;
		const password = req.body.password;

		const user = new User({
			username: username,
		})

		user.check((err) => {
			if (err) throw err;
		});

		res.redirect('/market');
};