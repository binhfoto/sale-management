'use strict';

process.env.NODE_ENV = 'testing';

let mongoose = require("mongoose");
let User = require('../server/api/user/model');
let KhachHang = require('../server/api/khachhang/model');
let SanPham = require('../server/api/sanpham/model');
let DonHang = require('../server/api/donhang/model');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let assert = chai.assert;
let user = {
    username: 'customer02',
    password: 'changeit'
};
let khachhang = {
    ten: 'Lê Trung Kiên',
    diaChi: '76, Cách Mạng Tháng 18, phường 3, quận 5, thành phố Hồ Chí Minh',
    soDienThoai: '0987123456'
}
let sanphams = [];

let jwt = '';
const URLs = {
    apiKhachHang: '/api/khachhangs/',
    authenticateion: '/auth/signin',
    apiUser: '/api/users',
    apiDonHang: '/api/donhangs',
    apiSanPham: '/api/sanphams/'
};

chai.use(chaiHttp);

describe('KhachHang', () => {
    before((done) => {
        //create user to authentica
        chai.request(server)
            .post(URLs.apiUser)
            .send(user)
            .then((req, res) => {
                // res.should.have.status(200);
                jwt = req.body;
                // done();
            }).then((res) => {
                //make a khachhang
                let urlKhachHangJWT = `${URLs.apiKhachHang}?access_token=${jwt.token}`;
                chai.request(server)
                    .post(urlKhachHangJWT)
                    .send(khachhang)
                    .end((req, res) => {
                        this.khachhang = res.body;
                    });
            }).then((result) => {
                //make 2 sanphams
                for (let i=0; i < 10; i++) {
                    let sanphamStr = `{
                            "maSP": "sp0${i}",
                            "ten": "Sản phẩm ${i}",
                            "quyCach": "Quy cach",
                            "donVi": "Chai",
                            "donGia": ${i * 10},
                            "nhom": "Chuc nang"
                        }`;
                    let sanphamJSON = JSON.parse(sanphamStr);
                    let urlSanPhamSWT = `${URLs.apiSanPham}?access_token=${jwt.token}`;

                    chai.request(server)
                        .post(urlSanPhamSWT)
                        .send(sanphamJSON)
                        .end((req, res) => {
                            // this.sanphams.push(res.body);
                            sanphams.push(res.body);
                            if(i == 9)
                                done();
                        });
                }
            })
            .catch(err => done(err));
    });
    after((done) => {
        SanPham.remove({})
            .then(
                () => {
                    KhachHang.remove({}).exec();
                },
                (err) => {
                    throw err;
                }
            ).then(
                () => {
                    User.remove({}).exec();
                },
                (err) => {
                    throw err;
                }
            ).then( () => {
                done();
            }).catch(err => done(err));
    });

    describe("/api/donhangs", () => {
        it("test", (done) => {
            done();
        });
    });
    describe("/api/donhangs/:id", () => {

    });
});