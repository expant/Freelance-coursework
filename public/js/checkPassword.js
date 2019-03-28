const password = document.querySelector('input[name=password]'),
      passwordAgain = document.querySelector('input[name=passwordAgain]'),
			sub = document.querySelector('type=submit');

const passErr = document.querySelector('p.pass-err');

sub.addEventListener('click', (e) => {
	e.preventDefault();

	const div = 'Пароль не совпадает!';

	if (password !== passwordAgain) {
		passErr.appendChild(div);
	}
});