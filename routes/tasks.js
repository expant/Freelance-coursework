const Task = require('../lib/Task');

module.exports = {
	createTask: (req, res) => {
		const title = req.body.title;
		const text = req.body.text;
		const price = req.body.price;

		const task = new Task({
			title: title,
			text: text,
			price: price
		});
		
		task.add(res, err => {
			if (err) throw err;
		});
	},

	selectTasks: (req, res) => {
		const task = new Task({});

		task.get(res, err => {
			if (err) throw err;
		});
	}
}