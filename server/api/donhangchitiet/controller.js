var Model = require('./model');
var DonHang = require('../donhang/model');
var SanPham = require('../sanpham/model');

var async = require('async');
var mongoose = require('mongoose');
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};
controller.params = _super.params(Model, 'refId maSP');
controller.get = _super.get(Model, 'refId maSP');
controller.getOne = _super.getOne();
controller.put = _super.put(Model);
controller.delete = _super.delete();

controller.post = function(req, res, next) {
    
    let newItem = req.body;
    let donhangId = newItem.refId;
    let sanphamId = newItem.maSP;
    newItem.refId = new mongoose.mongo.ObjectID(donhangId);
    newItem.maSP = new mongoose.mongo.ObjectID(sanphamId);
    
    newItem.refId._id = donhangId;
    newItem.maSP._id = sanphamId;

    newItem.thanhTien = newItem.thanhTien || 0;
    newItem.soLuongXuat = newItem.soLuongXuat || 0;
    newItem.xuatXuLy = newItem.xuatXuLy || 0;
    newItem.chietKhau = newItem.chietKhau || 0;

    async.waterfall([
        callback => {
            DonHang.findById(newItem.refId).lean().exec(callback);
        },
        (donHang, callback) => {
            newItem.maDH = donHang.maDH;
            newItem.refId.tongTien = donHang.tongTien;
            newItem.refId.thueVAT = donHang.thueVAT;
            callback(null, newItem);
        },
        (donHangChiTiet, callback) => {
            SanPham.findById(donHangChiTiet.maSP).lean().exec(function(err, sanPham){
                callback(err, donHangChiTiet, sanPham);
            });
        },
        (donHangChiTiet, sanPham, callback) => {
            donHangChiTiet.maSP.donGia = sanPham.donGia;
            callback(null, donHangChiTiet);
        },
        (donHangChiTiet, callback) => {
            Model.create(donHangChiTiet, callback);
        }
    ], function(err, result) {
        if(err) next(err);
        res.json(result);
    });
};

module.exports = controller;