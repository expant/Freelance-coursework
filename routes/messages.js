const Request = require('../models/Request');

module.exports = {
  getMessages: (req, res) => {
    if (req.session.username) {
      const username = req.session.username;
      const request = new Request({ username });

      request.getMessages(res, (err) => {
				if (err) throw err;
    	});
    } else {
      res.redirect('/sign_in');
    }
  }
}