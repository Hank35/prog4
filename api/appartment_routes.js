var express = require('express');
var routes = express.Router();
var db = require('../config/db');
var url = require('url');

routes.get('/appartments', function(req,res){
    var queryData = url.parse(req.url, true).query;

    db.query('SELECT * FROM apartment', function (error, results, fields){
        if (error) {
			console.log(error, results);
        	res.send({
          		"code":400,
          		"failed":"Error occurred"
        	})
        }else{
        	res.json({ result: results });
        }
    });
})

routes.get('/appartments/:id', function(req,res){

    
    db.query('SELECT * FROM apartment WHERE ApartmentId=' + req.params.id, function (error, result, fields){
        if (error){
            res.send(error)
            console.log('You got an error ' + error)
        } else {
            res.send(result)
            console.log('>>Apartment returned')
        }
    })

    });


routes.post('/appartments', function(req, res){

	console.dir(req.body);
    var Apartment = {
        ApartmentId: req.body.ApartmentId,
        Description: req.body.Description,
        StreetAddress: req.body.StreetAddress,
        Postalcode: req.body.Postalcode,
        City: req.body.City,
        UserId: req.body.UserId
    }
     
    db.query('INSERT INTO apartment(ApartmentId, Description, StreetAddress, Postalcode, City, UserId) VALUES ( "' + Apartment.ApartmentId + '", "' + Apartment.Description + '", "' + Apartment.StreetAddress + '", "' + Apartment.Postalcode + '", "' + Apartment.City + '", "' + Apartment.UserId + '")', (err, result) => {
        if (err) {
            if (err.errno === 1062) {
                res.send('This appartment already exists', (401))
                console.log('1062 error ' + err)
            }
            if (err) {
                res.status(401).send('You got an error')
                console.log('Error ' + err)
            }
        }
        else {
            res.send(result, 'Appartment created', (200))
            console.log('>>Appartment created')
        }
    })


});
             



module.exports = routes;

