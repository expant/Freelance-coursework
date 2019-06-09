
	const deleteTask = (taskId) => {
		console.log(taskId);

		let task = JSON.stringify({ taskId });

		const xhr = new XMLHttpRequest();
		xhr.open('POST', '/myTasks', true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.addEventListener('load', () => {
			let taskFromServer = JSON.parse(xhr.response);
			if (taskFromServer === 'Задача удалена') {
				console.log(taskFromServer);
				window.location.reload();
			}
		});
	xhr.send(task);
	}


