const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

username: String , 
passward: Number,
role:String

})

module.exports = mongoose.model("users",userSchema)