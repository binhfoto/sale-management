var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var TodoSchema = mongoose.Schema({
    name: String,
    completed: Boolean
});

var Todo = mongoose.model('todos', TodoSchema); // params: collection and schema
Todo.create({
    name: 'Send clothes to washing machine',
    completed: false
}).then(function(err, todo){
    console.log(err, todo);
});