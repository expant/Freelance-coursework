const client = require('../config/db');

class Request {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  createRequest(req, res, cb) {
		console.log(typeof this.employerName);
		client.query(`
			SELECT id FROM users WHERE name = '${this.employerName}';
		`, (err, result) => {
			if (err) throw err;
			const employerId = result[0].id;

			client.query(`
				SELECT id FROM users WHERE name = '${this.workerName}';
			`, (err, result) => {
				if (err) throw err;
				const workerId = result[0].id;
				let queryReq = `
					INSERT INTO requests (employer, worker, task_id) 
					VALUES ('${employerId}', '${workerId}', '${this.taskId}');
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
			SELECT id FROM users WHERE name = '${this.username}';
		`, (err, result) => {
			if (err) throw err;
			const userId = result[0].id;

			client.query(`
				SELECT * FROM requests WHERE employer = '${userId}' OR worker = '${userId}';
			`, (err, result) => {
				if (err) throw err;
				const messages = result;

				client.query(`
					SELECT * FROM users;
				`, (err, result) => {
					if (err) throw err;

					const userResult = result;

					userResult.forEach(user => {
						messages.forEach(message => {
							if (user.id === message.employer) {
								message.employer = user.name;
							}
						});
					});


					client.query(`
						SELECT * FROM tasks;
					`, (err, result) => {
						if (err) throw err;
						const taskResult = result;

						taskResult.forEach(task => {
							messages.forEach(message => {
								if (task.id === message.task_id) {
									message.task_id = task.title;
								}
							});
						});

						console.log(messages);

						res.render('../views/messages.pug', { 
							messages: messages, 
							username: this.username 
						});
					});
				});
			});
		});
	}
}

module.exports = Request;