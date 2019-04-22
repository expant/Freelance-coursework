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
      SELECT * FROM tasks
		`;
		
		client.query(query, (err, result) => {
			if (err) throw err;
			res.redirect('/market');
		});
	}
}

module.exports = Task;