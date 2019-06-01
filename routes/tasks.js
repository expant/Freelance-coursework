const Task = require('../models/Task');

module.exports = {
	createTask: (req, res) => {
			const dataOftask = {
				title: req.body.title,
				text: req.body.text,
				price: req.body.price
			}

			const task = new Task({
				title: dataOftask.title,
				text: dataOftask.text,
				price: dataOftask.price
			});

			task.add(res, err => {
				if (err) throw err;
			});	
	},

	selectTasks: (req, res) => {
		const task = new Task();

		task.get(res, err => {
			if (err) throw err;
		});
	},

	getTask: (req, res) => {
		const taskId = req.params.id;
		const task = new Task({ id: taskId });

		task.getTask(res, err => {
			if (err) throw err;
		})
	}
}