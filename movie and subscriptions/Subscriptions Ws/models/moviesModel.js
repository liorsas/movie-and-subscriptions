const mongoose = require('mongoose');

let moviesSchema = new mongoose.Schema({


name:String,
genres:[String] ,
image: String,
premiered: Date
})

module.exports = mongoose.model('movies',moviesSchema)