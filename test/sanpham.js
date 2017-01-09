'use strict';

process.env.NODE_ENV = 'testing';
let mongoose = require("mongoose");
let User = require('../server/api/user/model');
let SanPham = require('../server/api/sanpham/model');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let assert = chai.assert;
let sanpham_data_test = require("./data_test/data").sanpham_testsuite;
const user = sanpham_data_test.user;
let sanpham = sanpham_data_test.sanpham;

let jwt = '';
const URLs = require('./data_test/apis');

chai.use(chaiHttp);

describe('SanPham', () => {
    before((done) => {
        //create user to authentica
        chai.request(server)
            .post(URLs.apiUser)
            .send(user)
            .end((req, res) => {
                res.should.have.status(200);

                jwt = res.body;
                done();
            });

    });
    after((done) => {
        SanPham.remove({}, (err) => {
            //show error message when err not null
            User.remove({}, (err) => {
                //show error message when err not null
                done()
            });
        })
    });

    describe("/api/sanphams", () => {
        it("Create a sanpham", (done) => {
            let url = `${URLs.apiSanPham}?access_token=${jwt.token}`;

            chai.request(server)
                .post(url)
                .send(sanpham)
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(sanpham.ten, res.body.ten);
                    assert.equal(sanpham.maSP, res.body.maSP);
                    assert.equal(sanpham.donGia, res.body.donGia);
                    assert.equal(sanpham.donVi, res.body.donVi);
                    assert.equal(sanpham.nhom, res.body.nhom);
                    assert.equal(sanpham.quyCach, res.body.quyCach);
                    sanpham.id = res.body.id;
                    done();
                });
        });
        it("Get sanpham list", (done) => {
            let url = `${URLs.apiSanPham}?access_token=${jwt.token}`;

            chai.request(server)
                .get(url)
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(1, res.body.length);
                    done();
                });
        });
    });
    describe("/api/sanphams/:id", () => {
        it("Get a sanpham", (done) => {
            let url = `${URLs.apiSanPham}${sanpham.id}?access_token=${jwt.token}`;
            chai.request(server)
                .get(url)
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(sanpham.ten, res.body.ten);
                    assert.equal(sanpham.maSP, res.body.maSP);
                    assert.equal(sanpham.donGia, res.body.donGia);
                    assert.equal(sanpham.donVi, res.body.donVi);
                    assert.equal(sanpham.nhom, res.body.nhom);
                    assert.equal(sanpham.quyCach, res.body.quyCach);
                    done();
                });
        });
        it("Edit a sanpham", (done) => {
            let url = `${URLs.apiSanPham}${sanpham.id}?access_token=${jwt.token}`;
            const sanpham_edited = {
                maSP: "sp01",
                ten: "Sản phẩm A-edited",
                quyCach: "Quy cach-edited",
                donVi: "Lo",
                donGia: 10,
                nhom: "Chức năng"
            }

            chai.request(server)
                .put(url)
                .send(sanpham_edited)
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(sanpham_edited.ten, res.body.ten);
                    assert.equal(sanpham_edited.maSP, res.body.maSP);
                    assert.equal(sanpham_edited.donGia, res.body.donGia);
                    assert.equal(sanpham_edited.donVi, res.body.donVi);
                    assert.equal(sanpham_edited.nhom, res.body.nhom);
                    assert.equal(sanpham_edited.quyCach, res.body.quyCach);
                    done();
                });
        });
        it("Delete a sanpham", (done) => {
            let url = `${URLs.apiSanPham}${sanpham.id}?access_token=${jwt.token}`;
            chai.request(server)
                .delete(url)
                .end((req, res) => {
                    res.should.have.status(200);

                    chai.request(server)
                        .get(url)
                        .end((req, res) => {
                            res.should.have.status(500);
                            assert.equal(`Cannot found with id=${sanpham.id}`, res.text);
                            done();
                        });
                });
        });
    });
})