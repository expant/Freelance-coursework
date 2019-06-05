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

			const resultOfTask = result;
			client.query(`
				SELECT name FROM users WHERE id = '${resultOfTask[0].user_id}';
			`, (err, result) => {
				res.render('../views/task.pug', { 
					title: resultOfTask[0].title,
					text: resultOfTask[0].text,
					price: resultOfTask[0].price,
					username: result[0].name
				});
			});
		});
	}

	getMyTasks(res, cb) {
		client.query(`
			SELECT id FROM users WHERE name = '${this.username}';
		`, (err, result) => {
			const id = result[0].id;
			client.query(`
				SELECT * FROM tasks WHERE user_id = ${id};
			`, (err, result) => {
				if (err) throw err;
				const tasksResult = result;
				const username = this.username;
				res.render('../views/myTasks.pug', {
					tasks: tasksResult,
					username
				});
			});
		});
	}
}

module.exports = Task;