// create api router
var router = require('express').Router();

// api router will mount other routers for all our resources
// Each resource directory has a resourceRoute.js file with the router ready to go

// require them and mount them to their respective routes below
// by default, 'require' function will get the index.js file
router.use('/users', require('./user/route'));

router.use('/donhangs', require('./donhang/route'));
router.use('/khachhangs', require('./khachhang/route'));

router.use('/sanphams', require('./sanpham/route'));
router.use('/sanphamnhaps', require('./sanphamnhap/route'));
router.use('/sanphamtonkhos', require('./sanphamtonkho/route'));

module.exports = router;