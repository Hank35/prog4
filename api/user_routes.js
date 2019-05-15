var express = require('express');
var routes = express.Router();
var db = require('../config/db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


routes.post('/user/login', function (req, res) {
      // var user = {
      // EmailAddress: req.body.EmailAddress,
      // Password: req.body.Password
      // }
      // let sql = 'SELECT * FROM user WHERE EmailAddress = "' + user.EmailAddress + '"'
      // db.query(sql, (err, result) => {
      //     if (err) {
      //         console.log(err)
      //     } else {
      //         var Password = bcrypt.compareSync(req.body.Password, user.Password)
      //         if (passwordisValid) {

      //             var token = jwt.sign({ id: result.userid }, config.secretkey, {
      //                 expiresIn: 86400
      //             })
      //             res.send('Logged in', { auth: true, token: token }, (200))
      //             console.log('User logged in')
      //         }
      //         if (!passwordisValid) {
      //             res.send('Password does not match', (401))
      //             console.log(user)
      //             console.log(result)
      //             console.log(passwordisValid)
      //         }

      //     }
      // })
})
routes.post('/user', function  (req, res) {     
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
      let sql = 'INSERT INTO user(EmailAddress, Password, PhoneNumber, FirstName, LastName, City, StreetAddress, PostalCode, DataOfBirth) VALUES ("' + user.EmailAddress + '", "' + user.Password + '", "' + user.PhoneNumber + '", "' + user.FirstName + '", "' + user.LastName + '", "' + user.City + '", "' + user.StreetAddress + '", "'+ user.DataOfBirth + '", "' + user.PostalCode + '")'
            db.query(sql, (err, result) => {
            if (err) {
                  res.send(err)
            console.log('Error: ' + err)
            }else {
                  res.send(result, 'User created', (200))
      }
  })
})


module.exports = routes


// AuthController.validateToken,