const client = require('../config/db');

class Request {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  createRequest(req, res, cb) {
		console.log(`name : ${this.employerName}`);

		let sqlEmployerId = `
			SELECT id FROM tasks WHERE user_id = '${this.employerName}';
		`;

		client.query(sqlEmployerId, (err, result) => {
			if (err) {
				if (result[0].id === undefined) {
					console.log(`result : ${result[0].id}`);
				}
			}
			const employerId = result[0].id;

			client.query(`
				SELECT * FROM users WHERE user_id = '${employerId}';
			`, (err, result) => {
				if (err) throw err;
				const task_id = result[0].id;
				let queryReq = `
					INSERT INTO requests (employer_id, worker_id, task_id) 
					VALUES ('${5}', '${2}', '${1}');
				`;

				client.query(queryReq, (err, result) => {   
					if (err) throw err;
					res.json('Заявка принята');
				});
			});
		});
	}

	getMessages(res, cb) {
		client.query(`
			SELECT * FROM requests WHERE employer = '${this.username}';
		`, (err, result) => {
			if (err) throw err;
			const messages = result;

			console.log(messages);

			res.render('../views/messages.pug', { 
				messages: messages, 
				username: this.username 
			});
		});
	}

	showDialog(res, cb) {
		let query = `
			SELECT * FROM requests WHERE id = '${this.id}';
		`

		client.query(query, (err, result) => {
			if (err) throw err;
			const dialog = result;

			res.render('../views/dialog.pug', { dialog });
		});
	}
}

module.exports = Request;