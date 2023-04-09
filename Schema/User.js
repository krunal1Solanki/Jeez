const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username : {
        type : String, 
        required : true,
        unique : true,
    },
    email : {
        type : String, 
        required : true,
        unique : true,
    },
    password : {
        type : String, 
        required : true,
    },
    mobile : {
        type : String, 
    },
    cartId : {
        type : String,
        unique : true,
    }
})

module.exports = mongoose.model('users', userSchema);