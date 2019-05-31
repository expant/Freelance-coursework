(() => {
		const username = document.querySelector('[name=username]');
		const password = document.querySelector('[name=password]');
    const submit = document.querySelector('#submit');

    submit.addEventListener('click', () => {
			const data = {
        username: username.value,
        password: password.value
			};
			
			if (data.username.length > 0 && data.password.length > 0) {
				let user = JSON.stringify(data);

				const xhr = new XMLHttpRequest();		
				xhr.open('POST', '/sign_in', true);
				xhr.setRequestHeader("Content-Type", "application/json");	

				xhr.addEventListener('load', () => {
					let userFromServer = JSON.parse(xhr.response);

					if (userFromServer.error) {
						alert(userFromServer.error)
					} else {
						console.log(userFromServer.newUsername);
						window.location.replace('/');
					}
				});

				xhr.send(user);
			} else {
				username.style.borderBottom = '4px solid red';
				password.style.borderBottom = '4px solid red';
			}
		});

})();