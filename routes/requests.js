const Request = require('../models/Request');

module.exports = {
	createRequest: (req, res) => {
		if (req.session.username !== req.body.employerName) {
			const employerName = req.body.employerName;
			const taskId = req.session.taskId;
			const workerName = req.session.username;

			console.log(taskId);
			
			const requestData = {
				taskId: taskId,
				employerName: employerName,
				workerName: workerName
			}

			const request = new Request(requestData);
			request.createRequest(req, res, (err) => {
				if (err) throw err;
			});
		} else {
			res.json('Вы не можете откликнуться сами на себя!');
		}
	}
}	