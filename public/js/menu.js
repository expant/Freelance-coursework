const menu = document.querySelector('#nav-menu');
const title = document.querySelector('.title-nav');
const ul = document.querySelector('.menu ul')

title.addEventListener('click', () => {
    menu.classList.toggle('open');
});