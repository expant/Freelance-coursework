(() => {
	const showChange = document.querySelector('.show-change');
  const hideToChange = document.querySelector('.hide-toChange');
	const cancel = document.querySelector('#cancel');
	const newName = document.querySelector('[name=toChangeName]');
	const change = document.querySelector('#change');

  showChange.addEventListener('click', () => {
    showChange.hidden = true;
    hideToChange.classList.toggle('show-toChange');
	});

  cancel.addEventListener('click', (e) => {
    e.preventDefault();
    hideToChange.classList.toggle('show-toChange');
    showChange.hidden = false;
	});
	
	change.addEventListener('click', () => {
		console.log('Click change!!!');
		if (newName.value.length > 0) {
			let user = JSON.stringify({ newUsername: newName.value });

			console.log(`new Username : ${newName.value}`);

			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/userProfile', true);
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.addEventListener('load', () => {
				let userFromServer = JSON.parse(xhr.response);
				console.log(`
					Data sucessfully changed! 
					New name: ${userFromServer.newUsername}
				`);

				window.location.replace('/userProfile');
			});
			xhr.send(user);

		} else {
			console.log('Изменение не удалось');
		}
	});
})();	
