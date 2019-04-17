const User = require('../lib/User');
const options = require('./authentication');

module.exports = {
  getUserProfile: (req, res) => {
		res.render('userProfile', {
			username: options.username
		});
		console.log(options.username);
  }
}
