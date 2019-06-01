const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginformjade');
var db = mongoose.connection;
var UserChema = mongoose.Schema({
    name : {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    profileImage: {
        type: String,
    }
    
});
var User =  module.exports = mongoose.model('User', UserChema  );
module.exports.createUser = function (newUser, callBack) {
    newUser.save(callBack);
    
}