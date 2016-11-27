var bcrypt = require('bcrypt-nodejs'); // npm install bcrypt
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// middleware that will run before a document is created
// encrypt password before saving
customerSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

customerSchema.methods = {
    // check the password on sign in
    authenticate: function(plainTextPass){
        return bcrypt.compareSync(plainTextPass, this.password);
    },

    // hash the password
    encryptPassword: function(plainTextPass){
        if(!plainTextPass){
            return '';
        }else{
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPass, salt);
        }
    },

    toJson: function(){
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
};

module.exports = mongoose.model('user', customerSchema);