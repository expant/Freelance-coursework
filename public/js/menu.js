const menu = document.querySelector('#nav-menu');
const title = document.querySelector('.title-nav');

title.addEventListener('click', () => {
	
	menu.classList.toggle('open');
});