var http = require('http');
var express = require('express');
var appartmentRoutes = require('./api/appartment_routes')
var reservationRoutes = require('./api/reservation_routes')
var userRoutes = require('./api/user_routes')
var bodyParser =  require('body-parser');
var config = require('./config/config');
var db = require('./config/db');
var expressJWT = require('express-jwt');
var app = express();

app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse json

app.use('/api/', appartmentRoutes);
app.use('/api/', reservationRoutes);
app.use('/api/', userRoutes);

app.use(function(err, req, res, next) {
     console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});
app.listen(process.env.PORT || 3000, function(){
// 	console.log('Server is listening on port 3000');	
});
console.log(`Your port is ${process.env.PORT}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);

module.exports = app;
