var express = require('express');
var routes = express.Router();
var db = require('../config/db');
var url = require('url');



    routes.get('/appartments/:id/reservations', function(req, res) {
        
        db.query('SELECT * FROM reservation', (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error ' + err);
            }else {
                res.send(result)
                console.log('>>Reservations returned')
            }
        })
})

    routes.get('/appartments/:id/reservations/:id',function (req, res) {
        
        db.query('SELECT * FROM reservation WHERE ReservationId='+ req.params.id, (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error ' + err);
            }else {
                res.send(result)
                console.log('>>Reservations returned')
            }
        })
})

    routes.post('/appartments/:id/reservations', function (req, res) {
        var reservation = {
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Status: req.body.Status,
            UserId: req.body.UserId,
            ApartmentId: req.body.ApartmentId
        }
        if(req.body.StartDate < req.body.EndDate){
            res.send('End date is smaller then start date', (401));
            console.log('End date is smaller then start date');
        } else{
        db.query('INSERT INTO reservation( ApartmentId, StartDate, EndDate, Status, UserId) VALUES ( "' + reservation.ApartmentId + '", "' + reservation.StartDate + '", "' + reservation.EndDate + '", "' + reservation.Status + '", "' + reservation.UserId + '")', (err, result) => {
            if (err) {
                if (err.errno === 1062) {
                    res.send('This reservation already exists', (401))
                    console.log('1062 error ' + err)
                }
                if (err) {
                    res.status(401).send('You got an error')
                    console.log('Error ' + err)
                }
            }
            else {
                res.send(result, 'Reservation created', (200))
                console.log('>>Reservation created')
            }
        })
    }
}, 

    routes.put('/appartments/:id/reservations/:id', function (req, res) {
        var reservation = {
            ReservationId: req.body.ReservationId,
            ApartmentId: req.body.ApartmentId,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Status: req.body.Status,
            UserId: req.body.UserId
        }

        db.query('UPDATE reservation SET ReservationId= "' + reservation.ReservationId + '", ApartmentId = "' + reservation.ApartmentId + '", StartDate = "' + reservation.StartDate + '", EndDate = "' + reservation.EndDate + '", Status = "' + reservation.Status + '", UserId = "' + reservation.UserId + '" WHERE ReservationId = "' + reservation.ReservationId + '"', (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error: ' + err)
            } else {
                res.send(result, 'Reservation edited', (200))
                console.log('>>Reservation edited')
            }
        })

}) )
   
    routes.delete('/api/apartment/:id/reservations/:id',function (req, res) {
        var id = req.params.id
        db.query('DELETE FROM reservation WHERE ReservationId= ' + id, (err, result) => {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                res.send(result, 'Reservation deleted', (200))
                console.log('>>Reservation deleted')
            }
        })
    })



    module.exports = routes;
