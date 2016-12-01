var Category = require('../api/category/model');
var User = require('../api/user/model');
var Post = require('../api/post/model');

var _ = require('lodash');
var logger = require('./logger');

var users = [
    {username: 'susan', password: 'changeit'},
    {username: 'david', password: 'changeit'},
    {username: 'peter', password: 'changeit'}
];

var posts = [
    {title: 'React.js', text: 'Newbie'},
    {title: 'Angular 2', text: 'Newbie'},
    {title: 'Ember.js', text: 'Newbie'}
];

var categories = [
    {name: 'Javascript'},
    {name: 'Front-end'},
    {name: 'NodeJs'}
];

logger.log('Seeding the database');

var cleanDB = function(){
    var arr = [Category, User, Post];
    var cleanPromises = arr.map(function(model){
        return model.remove().exec();
    });
    return Promise.all(cleanPromises);
};


// create document
var createDoc = function(model, item){
    return new Promise(function(resolve, reject){
        new model(item).save(function(err, saved){
            return err ? reject(err) : resolve(saved);
        });
    });
};

var createUser = function(data){
    var userPromises = users.map(function(item){
        return createDoc(User, item);
    });

    return Promise.all(userPromises)
        .then(function(users){
            return _.merge({users: users}, data || {});
        });
};

var createCategory = function(data){
    var categoryPromises = categories.map(function(item){
        return createDoc(Category, item);
    });

     return Promise.all(categoryPromises)
        .then(function(categories){
            return _.merge({categories: categories}, data || {});
        });
};

var createPost = function(data) {
    
    var addCategory = function(post, category){
        post.categories.push(category);
        return new Promise(function(resolve, reject){
            post.save(function(err, saved){
                return err ? reject(err) : resolve(saved); 
            });
        });
    };

    // link post to author/user
    var newPosts = posts.map(function(item, i){
        item.author = data.users[i]._id;
        return createDoc(Post, item);
    });

    return Promise.all(newPosts)
        .then(function(savedPosts){
            // link post to category
            var arrPromises = savedPosts.map(function(item, i){
                return addCategory(item, data.categories[i]);
            });
            return Promise.all(arrPromises);
        })
        .then(function(obj){
            //logger.log(obj);
            return 'Seeded DB with 3 Posts, 3 Users, 3 Categories';
        });
};  

cleanDB() // pass data to next function
    .then(createUser) // input data is empty
    .then(createCategory) // input data is {users: users}
    .then(createPost) // input data is {users: users, categories: categoties}
    .then(logger.log.bind(logger))
    .catch(function(err){
        logger.log(err);
    });