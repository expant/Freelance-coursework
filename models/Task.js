const client = require('../config/db');

class Task {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
	}
	
	add(res, cb) {
		client.query(`
			SELECT id FROM users
			WHERE name = '${this.name}'
		`, (err, result) => {
			const userId = result[0].id;

			let query = `
				INSERT INTO tasks (title, text, price, user_id) 
				VALUES ('${this.title}', '${this.text}', '${this.price}', '${userId}'); 
			`;

			client.query(query, (err, result) => {
				if (err) throw err;
				res.redirect('/createTask');
			});
		});
	}

	get(req, res, cb) {
		client.query(`
			SELECT * FROM tasks ORDER BY id DESC;
		`, (err, result) => {
			if (err) throw err;
			const taskResult = result;
			
			client.query(`
				SELECT * FROM users;
			`, (err, result) => {
				if (err) throw err;
				const userResult = result;

				userResult.forEach(user => {
					taskResult.forEach(task => {
						if (task.user_id === user.id) {
							task.username = user.name;
						}
					});
				});

				const username = req.session.username;

				res.render('../views/market.pug', { 
					tasks: taskResult,
					username
				});
			});
		});
	}

	getTask(res, cb) {
		let query = `
			SELECT * FROM tasks WHERE id = '${this.id}';
		`;

		client.query(query, (err, result) => {
			if (err) throw err;

			res.render('../views/task.pug', { 
				title: result[0].title,
				text: result[0].text,
				price: result[0].price 
			});
		});
	}
}

module.exports = Task;