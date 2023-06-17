const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Pratik@123',
        database: 'journal_app',
    },
});

module.exports = knex;
