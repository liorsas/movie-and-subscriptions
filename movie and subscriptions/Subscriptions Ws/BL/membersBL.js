const membersModel = require("../models/membersModel");

function getMembers() {
  return new Promise((resolve, reject) => {
    membersModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getMember(id) {
  return new Promise((resolve, reject) => {
    membersModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addMember(obj) {
  return new Promise((resolve, reject) => {


    let member = new membersModel({
      name: obj.name,
      email: obj.email,
      city: obj.city,
    });
    member.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("created");
      }
    });
  });
}

function updateMember(id, obj) {
  return new Promise((resolve, reject) => {
   

    membersModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("updated");
      }
    });
  });
}

function deleteMember(id) {
    return new Promise((resolve, reject) => {
      membersModel.findByIdAndDelete(id, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve("deleted");
        }
      });
    });
  }

module.exports = { getMembers, getMember, addMember ,updateMember,deleteMember};
