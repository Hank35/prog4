//
// ./config/db.js
//
// Configuratiebestand voor MySql database.
//
var mysql = require('mysql');
var config = require('../config/config');

var connectionSettings = {
    host: process.env.DB_HOST || config.dbHost,
    user: process.env.DB_USER || config.dbUser,
    password: process.env.DB_PASSWORD || config.dbPassword,
    database: process.env.DB_DATABASE || config.dbDatabase,
    debug: false
}
var tconnectionSettings = {
    host: process.env.DB_HOST || config.tHost,
    user: process.env.DB_USER || config.tUser,
    password: process.env.DB_USER || config.tPassword,
    database: process.env.DB_DATABASE || config.tDatabase

}

var connection = mysql.createConnection(connectionSettings);

var testConnection = mysql.createConnection(tconnectionSettings);

testConnection.connect(function(error) {
    if (error) {
        console.error("Error connecting to test database " + tconnectionSettings.database + " on " + tconnectionSettings.host + ": " + error.message);
        return;
    } else {
        console.log("Connected to test database " + tconnectionSettings.database + " on " + tconnectionSettings.host);
    }
});

connection.connect(function(error) {
    if (error) {
        console.error("Error connecting to database " + connectionSettings.database + " on " + connectionSettings.host + ": " + error.message);
        return;
    } else {
        console.log("Connected to database " + connectionSettings.database + " on " + connectionSettings.host);
    }
});

module.exports = connection;