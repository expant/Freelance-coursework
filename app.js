const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bd = require('./lib/bd');
const market = require('./routes/market');

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

app.listen(7500, 'localhost', () => {
    console.log('Сервер запущен!');
    console.log('Адресс: http://localhost:7500');
});