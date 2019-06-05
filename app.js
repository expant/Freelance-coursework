// ---- connecting modules ----------------------------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

const app = express();
const jsonParser = express.json();

// ----- connecting routes ---------------------------------------
const authentication = require('./routes/authentication');
const { getUserProfile, changeTheData } = require('./routes/userProfile');
const tasks = require('./routes/tasks');
//const { changeData } = require('./routes/changeUserData');
//const { getUserProfile } = require('./routes/userProfile');
const showFreelancers = require('./routes/showFreelancers');
const requests = require('./routes/requests');
const { getMessages, showDialog } = require('./routes/messages');

// ---- middleware -------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'key is supersecret'
}));



// ---- set options -----------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ---- using routes ------------------------------------

/*server.on('connection', ws => {
    ws.send('Добро пожаловать на фриланс биржу');
    ws.on('message', message => {
        const arrClients = server.clients;
        arrClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});*/

app.get('/', jsonParser, authentication.getMainPage);

app.post('/', jsonParser, (req, res) => {
    if (req.body.exit === 'exit') {
        req.session.destroy(() => {
            res.json(req.body);
        });
    }
});

app.get('/market', tasks.selectTasks);
app.post('/market', jsonParser, requests.createRequest);

app.get('/market/:id', tasks.getTask);

app.get('/myTasks', tasks.getMyTasks);

app.get('/sign_in', (req, res) => {
    res.render('sign_in');
});

app.post('/sign_in', jsonParser, authentication.signIn);

app.get('/sign_up', (req, res) => {
    res.render('sign_up');
});

app.get('/userProfile', getUserProfile);

app.post('/userProfile', jsonParser, changeTheData);

app.post('/sign_up', jsonParser, authentication.signUp);

app.get('/createTask', (req, res) => {
    if (req.session.username) {
        const username = req.session.username;
        res.render('createTask', { username });
    } else {
        res.redirect('/sign_in');
    }
});

app.post('/createTask', tasks.createTask);

app.get('/freelancers', showFreelancers.showAll);

app.get('/messages', getMessages);
app.get('/messages/:id', showDialog);

app.listen(7500, 'localhost', () => {
    console.log('Сервер запущен!');
    console.log('Адресс: http://localhost:7500');
});