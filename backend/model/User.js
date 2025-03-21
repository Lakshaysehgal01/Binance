const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    balance:{
        type:Number,
        default:0
    },
    userId:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    privateKey:{
        type:String,
        required:true
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;