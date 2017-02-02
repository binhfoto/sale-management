var moment = require('moment');
var _ = require('lodash');
var controller = {};

controller.params = (Model, populate = '') => function(req, res, next, id) {
    
    var query = Model.findById(id);
     
    // get clean item from PUT, to avoid reference id is object
    if(populate.length > 0 && req.method !== 'PUT') {
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

/*
var re = new RegExp(req.params.search, 'i');

app.User.find().or([{ 'firstName': { $regex: re }}, { 'lastName': { $regex: re }}]).sort('title', 1).exec(function(err, users) {
    res.json(JSON.stringify(users));
});
*/

controller.get = (Model, populate = '', select = '', sort = '') => function(req, res, next) {

    // filter
    var filter = _.pickBy(req.query, function(value, key){
        return !_.startsWith(key, "_");
    });
    var findCondition = {};
    if(_.keys(filter).length > 0){
        _.map(filter, function(value, key) {
            switch (Model.schema.path(key).instance) {
                case "String":
                    findCondition[key] = { $regex: value, $options: 'i' };
                    //let newVal = '\\u' + [...value].map(cp => cp.codePointAt(0).toString(16)).join('\\u');
                    //findCondition[key] = new RegExp(value, 'i');
                    break;
                case "Number":
                    findCondition[key] = value;
                    break;
                case "Date":
                    var date = moment(value);
                    var nextDate = moment(date).add(1, 'days');
                    findCondition[key] = {$gte: date.toDate(), $lt: nextDate.toDate()};
                    break;
                default:
                    findCondition[key] = { $regex: value, $options: 'i' };
            }
        });
    }
    
    // count all the records
    var count = Model.count(findCondition);

    var query = Model.find(findCondition);
    
    if(populate.length > 0 ) {
        query = query.populate(populate);
    }
    if(select.length > 0) {
        query = query.select(select);
    }
    // only get records between _start and _end
    if(req.query._start && req.query._end) {
        query = query.skip(parseInt(req.query._start)).limit(parseInt(req.query._end));
    }
    if(req.query._sort) {
        // id: ASC, -id: DESC
        var sortStr = sort.concat(' ').concat(req.query._order === "ASC" ? "" : "-").concat(req.query._sort);
        query = query.sort(sortStr);
    }

    return Promise.all([count.exec(), query.exec()]).then(
        function(items) {
            var number = items[0];
            var records = items[1];
            //res.header("Access-Control-Expose-Headers", "x-total-count"); // for cors
            res.header("X-Total-Count", Math.max(number, records.length)); // number of all records
            res.json(records); // records on paging
        },
        function(err) {
            next(err);
        }
    );
};

controller.getOne = () => function(req, res, next) {
    var item = req.item.toObject();
    res.json(item);
};

/*controller.put = (Model) => function(req, res, next) {
    var newItem = req.body;
    Model.findOneAndUpdate({_id: newItem._id}, newItem, function(err, saveditem){
        if(err){
            next(err);
        }else{
            res.json(saveditem);
        }
    });
};*/

controller.put = () => function(req, res, next) {
    var currentItem = req.item;
    var newItem = req.body;

    _.merge(currentItem, newItem);

    // 'save' event will trigger some mongoose middleware, such as preSave
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
        // 'create' event will trigger some mongoose middleware, such as preSave
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