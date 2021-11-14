const mongoose = require('mongoose');

let membersSchema = new mongoose.Schema({


name:String,
email:String ,
city: String

})

module.exports = mongoose.model('members',membersSchema)