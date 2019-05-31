(() => {
	const showChange = document.querySelector('.show-change');
  const hideToChange = document.querySelector('.hide-toChange');
	const cancel = document.querySelector('.cancel');
	const newName = document.querySelector('[name=toChangeName]');
	const change = document.querySelector('.change');

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
		if (newName.value !== '') {
			let user = JSON.stringify({ newUsername: newName.value });

			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/userProfile', true);
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.addEventListener('load', () => {
				let userFromServer = JSON.parse(xhr.response);
				console.log(userFromServer.newUsername);
				window.location.replace('/');
			});

		}
	});
})();	
