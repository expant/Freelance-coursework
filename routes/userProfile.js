const User = require('../lib/User');
const options = require('./submit');

module.exports = {
  getUserProfile: (req, res) => {
		res.render('./userProfile', {
			username: options.username
		});
  }
}