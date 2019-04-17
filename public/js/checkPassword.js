const 
	password = document.querySelector('input[name=password]'),
	passwordAgain = document.querySelector('input[name=passwordAgain]'),
	sub = document.querySelector('input[type=submit]'),
	getForm = document.querySelector('.form');

sub.addEventListener('click', (e) => {

	e.preventDefault();

	if (password.value !== passwordAgain.value) {
		addErr(getForm);
	} else {
		const xhr = new XMLHttpRequest();
		const formData = new FormData(document.forms.person);

		xhr.open('POST', '/sign_up', true);

		xhr.send(formData);

		if (xhr.status != 200) {
			alert( xhr.status + ': ' + xhr.statusText );
		} 
	}
});

const addErr = (form) => {
	console.log('Пароль не совпадает');

	const div = document.createElement('div');
	div.textContent = 'Пароль не совпадает!';
	
	form.appendChild(div);
}