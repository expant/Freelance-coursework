const client = require('./db');

class Task {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
	}
	
	add(res, cb) {
		let query = `
      INSERT INTO tasks (title, text, price) 
      VALUES ('${this.title}', '${this.text}', '${this.price}'); 
		`;
		
		client.query(query, (err, result) => {
			if (err) throw err;
			res.redirect('/createTask');
		});
	}

	get(res, cb) {
		let query = `
      SELECT * FROM tasks;
		`;

		client.query(query, (err, result) => {
			if (err) throw err;
			res.render('../views/market.pug', { tasks: result });
		});
	}

	getTask(res, cb) {
		let query = `
			SELECT id FROM tasks WHERE id = '${this.id}';
		`;

		client.query(query, (err, result) => {
			if (err) throw err;

			res.render('../views/task.pug', { id: result[0].id });
		});
	}
}

module.exports = Task;