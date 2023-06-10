const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username : {
        type: mongoose.SchemaTypes.String,
        required : true,
        min : 4 , //minlength
        unique : true
    },
    password : {
        type: mongoose.SchemaTypes.String,
        required : true,
    }
});

const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;