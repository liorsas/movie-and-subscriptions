const userModel = require("./userModel");

function getUsersDb() {
  return new Promise((resolve, reject) => {
    userModel.find(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


function getUserDB(idVal){

  return new Promise((resolve, reject) => {
    userModel.findById(idVal,function(err,data){

if(err){

  reject(err)
}
else{
  resolve(data)
}

    })


 });


}

function addUser(obj){

return new Promise((resolve,reject) => {

let user = new userModel({
username:obj.uname,
passward:Math.floor(Math.random() *1000) +1,
role:obj.urole

})

user.save(function(err){
if(err){

  reject(err)
}
else{
  resolve(user._id)
}


})

})


}




function updateUserBYid(userid,userObj){
  return new Promise((resolve, reject) => {



userModel.findByIdAndUpdate(userid,
  {
    username: userObj.username,
    passward:userObj.passward,
    role: userObj.role 
  }
  ,function(err){

if(err){
reject (err)

}
else {
  resolve ("updated")
}

})

  })
}


function deleteUserDB(idval){

return new Promise((resolve,reject)=>{

  //id = idval.

  userModel.findByIdAndDelete(idval,function(err){

if(err){
reject(err)

}
else{

  resolve("deleted")
}

  })

})

}




module.exports = { getUsersDb,getUserDB,addUser,updateUserBYid ,deleteUserDB };
