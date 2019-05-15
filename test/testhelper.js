const sql = require('mysql')
const app = require('../server')
var db = require('../config/db');

beforeEach((done) => {
    let usersdelete = 'DELETE FROM users'
    db.query(usersdelete, (err, result) => {
        if (err) throw err
        else {

            let appartmentsdelete = 'DELETE FROM appartments'
            db.query(appartmentsdelete, (err, result) => {
                if (err) throw err
                else {

                    let reservationsdelete = 'DELETE FROM reservations'
                    db.query(reservationsdelete, (err, result) => {
                        if (err) throw err
                        else {

                            done()
                        }
                    })
                }
            })

        }
    })
})