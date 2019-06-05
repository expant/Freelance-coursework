const Request = require('../models/Request');

module.exports = {
	createRequest: (req, res) => {
		
		const employerName = req.body.employerName;
		const taskId = req.body.taskId;
		const workerId = req.session.username;

		const requestData = {
			workerId: workerId,
			employerName: employerName,
			taskId: taskId
		}

		const request = new Request(requestData);
		request.createRequest(req, res, (err) => {
			if (err) throw err;
		});
	}
}	