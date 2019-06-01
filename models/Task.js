const client = require('../config/db');

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
			alert("Задача успешно добавилась..")
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