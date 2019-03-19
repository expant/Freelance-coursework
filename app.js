const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const market = require('./routes/market');
const signIn = require('./routes/signIn');
//const showAllFreelancers = require('./routes/showFreelancers');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));


// Задаём опции -----------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/market', market.tasks);

app.get('/sign_in', (req, res) => {
    res.render('sign_in');
})

app.post('/sign_in', signIn.submit);

//app.get('/freelancers', showAllFreelancers.users);

app.listen(7500, 'localhost', () => {
    console.log('Сервер запущен!');
    console.log('Адресс: http://localhost:7500');
});