const Task = require('../models/Task');

module.exports = {
	createTask: (req, res) => {
		const username = req.session.username;
		const dataOftask = {
			title: req.body.title,
			text: req.body.text,
			price: req.body.price,
			name: username
		}

		const task = new Task({
			title: dataOftask.title,
			text: dataOftask.text,
			price: dataOftask.price,
			name: dataOftask.name
		});

		task.add(res, err => {
			if (err) throw err;
		});	
	},

	selectTasks: (req, res) => {
		if (req.session.username) {	
			const task = new Task();

			task.get(req, res, err => {
				if (err) throw err;
			});
		} else {
			res.redirect('/sign_in');
		}
			
	},

	getTask: (req, res) => {
		if (req.session.username) {
			const id = req.params.id;
			const task = new Task({ id });

			task.getTask(res, err => {
				if (err) throw err;
			});
		} else {
			res.redirect('/sign_in');
		}
	},

	getMyTasks: (req, res) => {
		if (req.session.username) {
			const username = req.session.username;

			const task = new Task({ username });
			task.getMyTasks(res, err => {
				if (err) throw err;
			});
		} else {
			res.redirect('/sign_in');
		}
	}
}