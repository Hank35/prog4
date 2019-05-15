const app = require('../server')
const request = require('supertest')
const chai = require('chai')
expect = chai.expect;
const sql = require('mysql')

const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'wachtwoord',
    database: 'rental'
});

describe('the user_controller ', () => {
    var user = {
        EmailAddress: "test@email.com",
        Password: "password",
        PhoneNumber: "0637322184",
        FirstName: "johny",
        LastName: "test",
        City: "odb",
        StreetAddress: "moersteen 2",
        PostalCode: "1234EE",
        DataOfBirth: "05-03-1990" 
    }

    var login = {
        email: "test@email.com",
        password: "password"
    }

    it('can get a list of users', (done) => {
        request(app)
            .get('users')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.body).to.be.an('Array')
                    expect(res.statusCode).to.equal(200)
                    done()
                }
            })
    })

    it('can register a new user', (done) => {
        request(app)
            .post('users/register')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.Message).to.equal('User created')
                    let sql = 'SELECT userid FROM users WHERE email= "test@registerTest.com"'
                    db.query(sql, (err, result) => {
                        var id = result[0].userid
                        request(app)
                            .get('/api/users/id=' + id)
                            .end((err, res) => {
                                expect(res.statusCode).to.equal(200)
                                expect(res.body[0].email).to.equal('test@registerTest.com')
                                done()
                            })
                    })
                }
            })
    })
})