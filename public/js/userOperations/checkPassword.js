(() => {
	const 
		username = document.querySelector('input[name=username]'),
		password = document.querySelector('input[name=password]'),
		passwordAgain = document.querySelector('input[name=passwordAgain]'),
		sub = document.querySelector('.form button'),
		getForm = document.querySelector('.form');

	const err = document.querySelector('#err');

	sub.addEventListener('click', () => {

		const userData = {
			username: username.value,
			password: password.value,
			passwordAgain: passwordAgain.value
		}

		if (userData.username === '') {

			username.style.borderBottom = '4px solid red';

		} else if (userData.password !== userData.passwordAgain) {

			password.style.borderBottom = '4px solid red';
			passwordAgain.style.borderBottom = '4px solid red';

		} else {
			let user = JSON.stringify(userData);

			const xhr = new XMLHttpRequest();		
			xhr.open('POST', '/sign_up', true);
			xhr.setRequestHeader("Content-Type", "application/json");	

			xhr.addEventListener('load', () => {
				let userFromServer = JSON.parse(xhr.response);

				if (userFromServer === 'Имя уже существует') {
					console.log(userFromServer)
					err.textContent = userFromServer;
		
				} else {
					console.log(userFromServer.username);
					window.location.replace('/');
				}	
			});

			xhr.send(user);
		}
	});
})();
	