const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "aman1234",
    database: "catanddogs"
})

module.exports = client