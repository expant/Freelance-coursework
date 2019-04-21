const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

// routes ----------------------------------------
const market = require('./routes/market');
const authentication = require('./routes/authentication');
const { changeData } = require('./routes/changeUserData');
//const { getUserProfile } = require('./routes/userProfile');
//const showAllFreelancers = require('./routes/showFreelancers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


// Задаём опции -----------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', authentication.getMainPage);

app.get('/market', market.tasks);

app.get('/sign_in', (req, res) => {
    res.render('sign_in');
});

app.post('/sign_in', authentication.signIn);

app.get('/sign_up', (req, res) => {
    res.render('sign_up');
});

app.get('/userProfile', authentication.getUserProfile);

app.post('/userProfile/:changeData', changeData);

app.post('/sign_up', authentication.signUp);

app.get('/createTask', (req, res) => {
    res.render('createTask');
});

//app.get('/freelancers', showAllFreelancers.users);

app.listen(7500, 'localhost', () => {
    console.log('Сервер запущен!');
    console.log('Адресс: http://localhost:7500');
});