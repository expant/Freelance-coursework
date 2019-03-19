const client = require('./db');

class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    check(cb) {

        const username = this.username;

        client.query(`
            SELECT name FROM users WHERE name = '${username}';
        `, (err, result) => {
            if (err) throw err;
            
            if (result.rows[0].name == username) {
                console.log('Вы зарегистр');
            } else {
                console.log('Нет');
                console.log(result);
            }
        });  
    }
}

module.exports = User;

