(() => {
	const exit = document.querySelector('#exit');

	exit.addEventListener('click', () => {
		let user = JSON.stringify({ exit: 'exit' });

		const xhr = new XMLHttpRequest();		
		xhr.open('POST', '/', true);
		xhr.setRequestHeader("Content-Type", "application/json");	

		xhr.addEventListener('load', () => {
			let userFromServer = JSON.parse(xhr.response);
			console.log(userFromServer.exit);
			window.location.replace('/');
		});

		xhr.send(user);
	});

})();	
