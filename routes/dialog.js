const Dialog = require('../models/Dialog');

module.exports = {
  showDialog: (req, res) => {
    if (req.session.username) {
      const id = Number(req.params.id);
      const dialog = new Dialog({ id });
      dialog.showDialog(req, res, (err) => {
        if (err) throw err;
      });
    } else {
      res.redirect('/sign_in');
    }
  },

  addAMessage: (req, res) => {
    const message = req.body.message;
    const user1 = req.body.user1;
    const user2 = req.session.username;
    const id = req.session.requestId;
    const currentTime = req.body.currentTime;

    const dialog = new Dialog({ message, user1, user2, id, currentTime });
    dialog.addAMessage(req, res, (err) => {
			if (err) throw err;
    });
  }
}