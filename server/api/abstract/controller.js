'use strict';

var _ = require('lodash');
var controller = {};

controller.params = (Model, populate = '') => function(req, res, next, id) {
    
    var query = Model.findById(id);
    
    if(populate.length > 0 ) {
        query = query.populate(populate);
    }

    query
        .exec()
        .then(
            function(item) {
                if(!item) {
                    next(new Error('Cannot found with id=' + id));
                }else {
                    req.item = item;
                    next();
                }
            }, 
            function(err) {
                next(err);
            }
        );
};

controller.get = (Model, populate = '', select = '', sort = '') => function(req, res, next) {

    // count all the records
    var count = Model.count({});

    // only get records between _start and _end
    var query = Model.find();
    
    if(populate.length > 0 ) {
        query = query.populate(populate);
    }
    if(select.length > 0) {
        query = query.select(select);
    }
    if(req.query._start && req.query._end) {
        query = query.skip(parseInt(req.query._start)).limit(parseInt(req.query._end));
    }
    if(req.query._sort) {
        // id: ASC, -id: DESC
        var sortStr = sort.concat(' ').concat(req.query._order === "ASC" ? "" : "-").concat(req.query._sort);
        query = query.sort(sortStr);
    }

    return Promise.all([count.exec(), query.exec()]).then(
        function(items){
            var number = items[0];
            var records = items[1];
            //res.header("Access-Control-Expose-Headers", "x-total-count"); // for cors
            res.header("X-Total-Count", Math.max(number, records.length)); // number of all records
            res.json(records); // records on paging
        },
        function(err){
            next(err);
        }
    );
};

controller.getOne = () => function(req, res, next) {
    var item = req.item;
    res.json(item);
};

controller.put = () => function(req, res, next) {
    var currentItem = req.item;
    var newItem = req.body;

    _.merge(currentItem, newItem);

    currentItem.save(function(err, saveditem){
        if(err){
            next(err);
        }else{
            res.json(saveditem);
        }
    });
};

controller.post = (Model) => function(req, res, next) {
    var newItem = req.body;
    Model
        .create(newItem)
        .then(
            function(item){
                res.json(item);
            }, 
            function(err){
                next(err);
            }
        );
};

controller.delete = () => function(req, res, next) {
    var item = req.item;
    item.remove(function(err, removedItem){
        if(err){
            next(err);
        }else{
            res.json(removedItem);
        }
    });
};

module.exports = controller;