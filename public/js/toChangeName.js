const showChange = document.querySelector('.show-change');
const hideToChange = document.querySelector('.hide-toChange');
const cancel = document.querySelector('.cancel');

showChange.addEventListener('click', (e) => {
    e.preventDefault();

    showChange.hidden = true;
    hideToChange.classList.toggle('show-toChange');
});

cancel.addEventListener('click', (e) => {
    e.preventDefault();
    hideToChange.classList.toggle('show-toChange');
    showChange.hidden = false;
});