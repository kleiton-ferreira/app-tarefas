// backend/db/db.js

let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // Corrected server address.
const database = 'to-do-list';

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection error', err);
            });
    }
}

module.exports = new Database();