const User = require('../lib/User');

exports.changeData = (req, res) => {
  const urlParam = req.params.changeData;
	
	if (urlParam == 'name') {
		const updateData = req.body.toChangeName;

		const user = new User({
			urlParam: urlParam,
			updateData: updateData
		});

		user.update(res, (err) => {
			if (err) throw err;
		});
	} else if (urlParam == 'age') {
		const updateData = req.body.toChangeAge;

		const user = new User({
			urlParam: urlParam,
			updateData: updateData
		});

		user.update(res, (err) => {
			if (err) throw err;
		});
	}
}