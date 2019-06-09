const client = require('../config/db');

class Dialog {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
	}
	
  showDialog(req, res, cb) {
		console.log(this.id);
		let query = `
			SELECT * FROM requests WHERE id = '${this.id}';
		`;

		client.query(query, (err, result) => {
			if (err) throw err;
			console.log(result);
			const dialog = result;

			client.query(`
				SELECT name FROM users WHERE id = '${dialog[0].worker}';
			`, (err, result) => {
				const workerName = result[0].name;
				console.log(dialog[0].employer);
				console.log(dialog[0].worker);

				client.query(`
					SELECT * FROM dialogs WHERE request_id = '${this.id}';
				`, (err, result) => {
					const messages = result;
					console.log(messages);
					req.session.requestId = this.id;
					const username = req.session.username;
					res.render('../views/dialog.pug', { dialog, workerName, messages, username });
				});
			});
		});
	}

	addAMessage(req, res, cb) {
		client.query(`
			SELECT id FROM users WHERE name = '${this.user1}';
		`, (err, result) => {
			if (err) throw err;
 			const user1Id = result[0].id;

			client.query(`
				SELECT id FROM users WHERE name = '${this.user2}';
			`, (err, result) => {
				if (err) throw err;
				const user2Id = result[0].id;
				
				client.query(`
					INSERT INTO dialogs (user1_id, user2_id, message, request_id, time) 
					VALUES ('${user1Id}', '${user2Id}', '${this.message}', '${this.id}', '${this.currentTime}');
				`, (err, result) => {
					if (err) throw err;
					res.json({ 
						message: this.message,
						time: this.currentTime
					});
				});
			});
		});
	}
}

module.exports = Dialog;