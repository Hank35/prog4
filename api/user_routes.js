var express = require('express');
var routes = express.Router();
var db = require('../config/db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var validator = require("email-validator");
var postalCodes = require('postal-codes-js');

routes.get('/users', function(req,res){
    let sql = 'SELECT * FROM user'
    db.query(sql, (err, result) => {
        if (err) throw (err)
        else {
            res.send(result, 'User has been returned', (200))
        }
})
})
routes.post('/users/login', function(req, res) {
    let user = {
        EmailAddress: req.body.EmailAddress,
        Password: req.body.Password
    }
    let sql = 'SELECT password FROM user WHERE EmailAddress = "' + user.EmailAddress + '"'
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            var passwordisValid = bcrypt.compareSync(req.body.password, result[0].password)
            if (passwordisValid) {
                
                var token = jwt.sign({user}, config.secretkey, {
                    expiresIn: 86400
                })
                res.status(200).send({ auth: true, token: token });
                
            }
            if (!passwordisValid) {
                res.status(401).send({Message: 'Password does not match'})
                
            }
            
        }
    })
})
routes.post('/users', function  (req, res) {     
    var user = {
        EmailAddress: req.body.EmailAddress,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        City: req.body.City,
        StreetAddress: req.body.StreetAddress,
        PostalCode: req.body.PostalCode,
        DataOfBirth: req.body.DataOfBirth
        
    }

    function phonecheck(inputtxt) {
        var PhoneNumber = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if(user.PhoneNumber.value.match(PhoneNumber)) {
          return true;
        }  
        else {  
          return false;
        }
      }

    if( validator.validate( phonecheck & postalCodes.validate('nl', PostalCode == true))){
            let sql = 'INSERT INTO user(EmailAddress, Password, PhoneNumber, FirstName, LastName, City, StreetAddress, PostalCode, DataOfBirth) VALUES ("' + user.EmailAddress + '", "' + user.Password + '", "' + user.PhoneNumber + '", "' + user.FirstName + '", "' + user.LastName + '", "' + user.City + '", "' + user.StreetAddress + '", "'+ user.DataOfBirth + '", "' + user.PostalCode + '")'
                    db.query(sql, (err, result) => {
                    if (err) {
                        res.send(err)
                    console.log('Error: ' + err)
                    }else {
                          res.send(result, 'User created', (200))
                    }
                    })
        }else {
            console.log( 'not a phonenumber or postalcode')
        }
})


module.exports = routes


// AuthController.validateToken,