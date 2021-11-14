const mongoose = require("mongoose");

let subscriptionsSchema = new mongoose.Schema({
  memberid: mongoose.ObjectId,
  movies:[{movieid:mongoose.ObjectId, date:Date }]

  //  memberid: { type: mongoose.ObjectId },
  //  movies: [
  //   {
  //      movieid: { type: mongoose.ObjectId },
  //      date: { type: String },
  //   },
  // ],
});

module.exports = mongoose.model("subscriptions", subscriptionsSchema);
