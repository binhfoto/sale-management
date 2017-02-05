'use strict';

process.env.NODE_ENV = 'testing';

let mongoose = require("mongoose");
var generateDonHangId = require('../server/util/common').generateDonHangId;
let User = require('../server/api/user/model');
let KhachHang = require('../server/api/khachhang/model');
let SanPham = require('../server/api/sanpham/model');
let DonHang = require('../server/api/donhang/model');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var random = require('../server/util/random');
const async = require('async');

let should = chai.should();
let assert = chai.assert;
let donhang_data_test = require("./data_test/data").donhang_testsuite;
const user = donhang_data_test.user;
let khachhang = donhang_data_test.khachhang;
let sanphams = [];
let sanphamDonHang = [];
let donhang = {};
let temp = [];

let jwt = '';
const URLs = require('./data_test/apis');

chai.use(chaiHttp);

describe('Donhang', () => {
    before((done) => {
        async.waterfall([
            callback => {
                chai.request(server)
                    .post(URLs.apiUser)
                    .send(user)
                    .end((req, res) => {
                        if (res.status != 200) {
                            let error = {
                                point: 'Create user',
                                error: res.status,
                                des: res.error
                            };
                            return callback(error, null);
                        }
                        jwt = res.body;
                        callback(null, res.body.token);
                    });
            },
            (token, callback) => {
                let urlKhachHangJWT = `${URLs.apiKhachHang}?access_token=${token}`;
                chai.request(server)
                    .post(urlKhachHangJWT)
                    .send(khachhang)
                    .end((req, res) => {
                        if (res.status != 200) {
                            let error = {
                                point: 'Create khachhang',
                                error: res.status,
                                des: res.error
                            };
                            return callback(error, null);
                        }
                        khachhang = res.body;
                        callback(null, token);
                    });
            },
            (token, callback) => {
                makeSanphams(token, callback)
            },
            callback => {
                let tongTienFloat = 0.00;

                for (let i = 0; i < sanphams.length; i++) {
                    let soLuongXuatInt = random(100, 1000);
                    let xuatXuLyInt = random(5, 20);
                    let chietKhauInt = random(5, 10);
                    let thanhTienFloat = sanphams[i].donGia * soLuongXuatInt - parseFloat(((sanphams[i].donGia * soLuongXuatInt) * chietKhauInt) / 100);

                    tongTienFloat += thanhTienFloat;

                    sanphamDonHang.push({
                        "maSP": sanphams[i].id,
                        "soLuongXuat": soLuongXuatInt,
                        "xuatXuLy": xuatXuLyInt,
                        "chietKhau": chietKhauInt,
                        "thanhTien": thanhTienFloat
                    });
                }

                callback(null);
            },
            callback => {
                donhang = {
                    'maDH': generateDonHangId(),
                    'ngayTaoDH': Date.now(),
                    'maKH': khachhang.id,
                    'sanpham': sanphamDonHang,
                    'thueVAT': 10,
                    'chietKhau': 1,
                    'thanhTien': 2
                };
                callback();
            }
        ], function(err, results) {
            if (err) return done(err);
            done();
        });
    });
    after((done) => {
        SanPham.remove({})
            .then(
                () => {
                    User.remove({}).exec();
                },
                (err) => {
                    throw err;
                }
            ).then(
                () => {
                    KhachHang.remove({}).exec();
                },
                (err) => {
                    throw err;
                }
            ).then(
                () => {
                    DonHang.remove({}).exec()
                },
                (err) => {
                    throw err;
                }).then(() => {
                done();
            }).catch(err => done(err));
    });

    describe("/api/donhangs", () => {
        it("Make a donhang", (done) => {
            let url = `${URLs.apiDonHang}?access_token=${jwt.token}`;

            chai.request(server)
                .post(url)
                .send(donhang)
                .end((req, res) => {
                    if (res.error) {
                        console.log(res.error);
                        return done(res.error);
                    }
                    donhang = res.body;
                    res.should.have.status(200);
                    done();
                });
        });
        it("Get donhangs", (done) => {
            let url = `${URLs.apiDonHang}?access_token=${jwt.token}`;

            chai.request(server)
                .get(url)
                .end((req, res) => {
                    if (res.error) {
                        console.log(res.error);
                        return done(res.error);
                    }
                    res.should.have.status(200);
                    done();
                });
        })
    });
    describe("/api/donhangs/:id", () => {
        it("Get a donhang", (done) => {
            let url = `${URLs.apiDonHang}/${donhang._id}?access_token=${jwt.token}`;

            chai.request(server)
                .get(url)
                .end((req, res) => {
                    if (res.error) {
                        console.log(res.error);
                        return done(res.error);
                    }
                    res.should.have.status(200);
                    done();
                });
        });
        it("Edit a donhang", (done) => {
            let url = `${URLs.apiDonHang}/${donhang._id}?access_token=${jwt.token}`;

            let donhang_edited = {
                '_id': donhang._id,
                'maDH': generateDonHangId(),
                'ngayTaoDH': Date.now(),
                'maKH': khachhang.id,
                'sanpham': sanphamDonHang,
                'thueVAT': 20,
                'chietKhau': 1,
                'thanhTien': 2
            };

            chai.request(server)
                .put(url)
                .send(donhang_edited)
                .end((req, res) => {
                    if (res.error) {
                        console.log(res.error);
                        return done(res.error);
                    }
                    res.should.have.status(200);
                    done();
                });
        });
        it("Delete a donhang", (done) => {
            let url = `${URLs.apiDonHang}/${donhang._id}?access_token=${jwt.token}`;

            chai.request(server)
                .del(url)
                .end((req, res) => {
                    if (res.error) {
                        console.log(res.error);
                        return done(res.error);
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

function makeSanphams(token, callback) {
    let urlSanPhamSWT = `${URLs.apiSanPham}?access_token=${token}`;
    let sanphamStr = `{
                            "maSP": "sp01",
                            "ten": "Sản phẩm 1",
                            "quyCach": "Quy cach",
                            "donVi": "Chai",
                            "donGia": 10,
                            "nhom": "Chuc nang"
                        }`;
    let sanphamArr = [];

    for (let i = 0; i < 10; i++) {
        let sanpham = {
            'maSP': `sp${i}`,
            'ten': `Sản phầm ${i}`,
            'quyCach': `Quy cách ${i}`,
            'donVi': `Chai`,
            'donGia': i * 10,
            'nhom': 'Chuc nang'
        };
        sanphamArr.push(sanpham);
    }

    async.each(sanphamArr, (sanpham, callback) => {
        chai.request(server)
            .post(urlSanPhamSWT)
            .send(sanpham)
            .end((req, res) => {
                if (res.status != 200) {
                    let error = {
                        point: 'Make a sanpham',
                        error: res.status,
                        des: res.error
                    };
                    return callback(error, null);
                }
                sanphams.push(res.body);
                callback();
            });
    }, err => {
        if (err)
            console.log(err);
        else {
            console.log("Imported 10 sanphams");
        }
        callback(null);
    });
}