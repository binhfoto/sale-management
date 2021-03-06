'use strict';

process.env.NODE_ENV = 'testing';

let mongoose = require("mongoose");
let User = require('../server/api/user/model');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let user = require('./data_test/data').user_testsuite.user;
const URLs = require('./data_test/apis');
let jwt = '';
const cleanData = (done) => {
    User.remove({}, (err) => {
        done();
    })
};


chai.use(chaiHttp);

describe('User', () => {
    before(cleanData);
    after(cleanData);
    describe('Create a user', () => {
        it('normal', (done) => {
            chai.request(server)
                .post(URLs.apiUser)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("User singin", () => {
        it("Login", (done) => {
            chai.request(server)
                .post(URLs.apiAuth)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    jwt = res.body;
                    done();
                });
        })
    });
    describe('Get users', () => {
        it('normal', (done) => {
            chai.request(server)
                .get(URLs.apiUser)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });
    describe("Test with :id param and /users/me router", () => {
        let userID = '';

        it("Test with /users/me router", (done) => {
            let fullURL = `${URLs.apiUser}/me?access_token=${jwt.token}`;

            chai.request(server)
                .get(fullURL)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    let username = res.body.username;
                    username.should.equal('admin');
                    userID = res.body._id;
                    done();
                });
        });
        it("Get a user by userid - use query string parameter in the route", (done) => {
            let fullURL = `${URLs.apiUser}/${userID}`;

            chai.request(server)
                .get(fullURL)
                .end((req, res) => {

                    res.should.have.status(200);
                    let username = res.body.username;
                    username.should.equal('admin');
                    done();
                });
        });
        it("Update a user by userid - change password", (done) => {
            let fullURL = `${URLs.apiUser}/${userID}?access_token=${jwt.token}`;
            let userUpdated = {
                username: 'admin',
                password: 'changeit123'
            }

            chai.request(server)
                .put(fullURL)
                .send(userUpdated)
                .end((req, res) => {
                    res.should.have.status(200);

                    let signinURL = URLs.apiAuth;
                    chai.request(server)
                        .post(signinURL)
                        .send(userUpdated)
                        .end((req, res) => {
                            res.should.have.status(200);
                            done();
                        });

                });
        });
        it("Delele a user", (done) => {
            let fullURL = `${URLs.apiUser}/${userID}?access_token=${jwt.token}`;

            chai.request(server)
                .delete(fullURL)
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});