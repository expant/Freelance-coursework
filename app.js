// ---- connecting modules ----------------------------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const jsonParser = express.json();

// ----- connecting routes ----------------------------------------
const authentication = require('./routes/authentication');
const tasks = require('./routes/tasks');
const { changeData } = require('./routes/changeUserData');
//const { getUserProfile } = require('./routes/userProfile');
const showFreelancers = require('./routes/showFreelancers');

// ---- middleware -------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'key is supersecret'
}));



// ---- set options -----------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ---- using routes ------------------------------------
app.get('/', authentication.getMainPage);

app.get('/market', tasks.selectTasks);

app.get('/market/:id', tasks.getTask);

app.get('/sign_in', (req, res) => {
    res.render('sign_in');
});

app.post('/sign_in', jsonParser, authentication.signIn);

app.get('/sign_up', (req, res) => {
    res.render('sign_up');
});

app.get('/userProfile', authentication.getUserProfile);

app.post('/sign_up', jsonParser, authentication.signUp);

app.get('/createTask', (req, res) => {
    if (req.session.username) {
        res.render('createTask');
    } else {
        res.redirect('/sign_in');
    }
});

app.post('/createTask', tasks.createTask);

app.get('/freelancers', showFreelancers.showAll);

app.listen(7500, 'localhost', () => {
    console.log('Сервер запущен!');
    console.log('Адресс: http://localhost:7500');
});