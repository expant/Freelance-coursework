const User = require('../models/User');

module.exports = {
  getUserProfile: (req, res) => {
		if (req.session.username) {
			const username = req.session.username;
			res.render('userProfile', { username });
		} else {
			res.redirect('/sign_in');
		}	
  }		
}
