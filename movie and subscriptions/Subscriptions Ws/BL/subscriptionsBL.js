const subscriptionsModel = require("../models/subscriptionsModel");
const mongoose = require('mongoose')

function getSubscriptions() {
  return new Promise((resolve, reject) => {
    subscriptionsModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


function getSubscriptionsSearchByMovieId(idval) {
  return new Promise((resolve, reject) => {
let idv =   mongoose.Types.ObjectId(idval)

    subscriptionsModel.find({movies:{$elemMatch:{movieid:idv}}}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getSubscriptionsSearchByMemberId(idval) {
  return new Promise((resolve, reject) => {
let idv =   mongoose.Types.ObjectId(idval)

    subscriptionsModel.find({memberid:idv}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}



function getSubscription(id) {
  return new Promise((resolve, reject) => {
    subscriptionsModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addSubscription(obj) {
  return new Promise((resolve, reject) => {
    let subscription = new subscriptionsModel(obj)
     // memberid: obj.memberid,
     // movies: obj.movies
   // });
    subscription.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("created");
      }
    });
  });
}

function updateSubscription(id, obj) {
  return new Promise((resolve, reject) => {
   // let updObj = {
    //  memberid: obj.memberid,
    //  movies: {
     //   movieid: obj.movieid,
     //   date: obj.date,
    //  },
    //};

    subscriptionsModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("updated");
      }
    });
  });
}

function deleteSubscription(id) {
  return new Promise((resolve, reject) => {
    subscriptionsModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
}

module.exports = {
  getSubscriptions,
  getSubscriptionsSearchByMovieId,
  getSubscriptionsSearchByMemberId,
  getSubscription,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
