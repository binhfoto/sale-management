'use strict';

process.env.NODE_ENV = 'testing';

let mongoose = require("mongoose");
let User = require('../server/api/user/model');
let KhachHang = require('../server/api/khachhang/model');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let assert = chai.assert;
let user = {
    username: 'customer01',
    password: 'changeit'
    };
let khachhang = {
    ten: 'Lê Trung Kiên',
    diaChi: '76, Cách Mạng Tháng 18, phường 3, quận 5, thành phố Hồ Chí Minh',
    soDienThoai: '0987123456'
}
let jwt = '';
const URLs = {
    apiKhachHang: '/api/khachhangs/',
    authenticateion: '/auth/signin',
    apiUser: '/api/users'
};

chai.use(chaiHttp);

describe('KhachHang', () => {
    before( (done) => {
        //create user to authentica
        chai.request(server)
            .post(URLs.apiUser)
            .send(user)
            .end( (req, res) => {
                res.should.have.status(200);

                jwt = res.body;
                done();
            });
        
    });
    after( (done) => {
        KhachHang.remove({}, (err) => {
            //show error message when err not null
            User.remove({}, (err) => {
                //show error message when err not null
                done()
            });    
        })
    });

    describe("/api/khachhangs", () => {
        it("Create a khachhang", (done) => {
            let url = `${URLs.apiKhachHang}?access_token=${jwt.token}`;

            chai.request(server)
                .post(url)
                .send(khachhang)
                .end( (req, res) => {
                    res.should.have.status(200);
                    assert.equal(khachhang.ten, res.body.ten);
                    assert.equal(khachhang.diaChi, res.body.diaChi);
                    assert.equal(khachhang.soDienThoai, res.body.soDienThoai);
                    khachhang.id = res.body.id;
                    done();
                });
        });
        it("Get khachhangs list", (done) => {
            let url = `${URLs.apiKhachHang}?access_token=${jwt.token}`;

            chai.request(server)
                .get(url)
                .end( (req, res) => {
                    res.should.have.status(200);
                    assert.equal(1, res.body.length);
                    done();
                });
        });
    });
    describe("/api/khachhangs/:id", () => {
        

        it("Get a khachhangs", (done) => {
            let url = `${URLs.apiKhachHang}${khachhang.id}?access_token=${jwt.token}`;
            chai.request(server)
                .get(url)
                .end( (req, res) => {
                    res.should.have.status(200);
                    assert.equal(khachhang.id, res.body.id);
                    assert.equal(khachhang.ten, res.body.ten);
                    assert.equal(khachhang.diaChi, res.body.diaChi);
                    assert.equal(khachhang.soDienThoai, res.body.soDienThoai);
                    done();
                });
        });
        it("Edit a khachhang", (done) => {
            let url = `${URLs.apiKhachHang}${khachhang.id}?access_token=${jwt.token}`;
            let khachhang_edit = {
                ten: 'Lê Trung Kiên-edited',
                diaChi: '76, Cách Mạng Tháng 18, phường 3, quận 5, thành phố Hồ Chí Minh-edited',
                soDienThoai: '0987123456-edited'
            }

            chai.request(server)
                .put(url)
                .send(khachhang_edit)
                .end( (req, res) => {
                    res.should.have.status(200);
                    assert.equal(khachhang.id, res.body.id);
                    assert.equal(khachhang_edit.ten, res.body.ten);
                    assert.equal(khachhang_edit.diaChi, res.body.diaChi);
                    assert.equal(khachhang_edit.soDienThoai, res.body.soDienThoai);
                    done();
                });
        });
        it("Delete a khachhang", (done) => {
            let url = `${URLs.apiKhachHang}${khachhang.id}?access_token=${jwt.token}`;
            chai.request(server)
                .delete(url)
                .end( (req, res) => {
                    res.should.have.status(200);
                    
                    chai.request(server)
                        .get(url)
                        .end( (req, res) => {
                            res.should.have.status(500);
                            assert.equal(`Cannot found with id=${khachhang.id}`, res.text);
                            done();
                        });
                });
        });
    });
});