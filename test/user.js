'use strict';

process.env.NODE_ENV = 'testing';

let mongoose = require("mongoose");
let User = require('../server/api/user/model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    before((done) => {
        User.remove({}, (err) => {
            done();
        })
    });
    describe('Create user', () => {
        let user = {
            username: 'admin',
            password: 'changeit'
        }

        it('create user', (done) => {
            chai.request(server).post('/api/users').send(user).end((req, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});