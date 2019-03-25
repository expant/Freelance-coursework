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
            SELECT * FROM users WHERE name = ${username};
        `, (err, result) => {
            if (err) throw err;
            console.log(result[0].name);
    
        });  
    }

    save(cb) {
        
    }
}

module.exports = User;

