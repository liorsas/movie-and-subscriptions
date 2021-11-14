const userModelBL = require("../models/userModelBL");
const permissionsDal = require("../DALs/permissionsFileDal")
const usersDal = require("../DALs/usersFileDal")

//check exists user
async function authCheck(obj) {
  try {
    let usersDB = await userModelBL.getUsersDb();
    console.log(usersDB)


    let validUser = usersDB.find(
      (el) => el.username == obj.username && el.passward == obj.pass
    );
    if (validUser) {
      return validUser;
    } else return false;
  } catch (err) {
    console.log(err);
  }
}

//check admin exists

async function checkAdmin(obj) {
  try {
    let usersDB = await userModelBL.getUsersDb();
    let fndUser = usersDB.find(
      (el) => el.username == obj.username && el.passward == obj.pass
    );
    //console.log(fndUser);
    if (fndUser) {
      if (fndUser.role == "Admin") {
        //console.log(fndUser.role);
        return true;
      } else {
        return false;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
  }
}

//create user (change passward only)

async function checkUserExsitsAnUpdate(obj){
  try{

  let usersDB = await userModelBL.getUsersDb();
  

  let fndUser = usersDB.find(
    (el) => el.username == obj.username 
  );

  //console.log(fndUser)
  if(fndUser)
  {

    if(fndUser.passward !== obj.pass)
{

  let newObj = {
    username:obj.username,
    passward: parseInt(obj.pass),
    role:fndUser.role

  }

  let userid = fndUser._id.toString()

  console.log(newObj)

    let resp  = await userModelBL.updateUserBYid(userid,newObj)

   // console.log(resp)

    return resp

  }
else return false


}
return false

}
catch(err){
  console.log(err)
}
}



async function getUserDetails(idval) {
  try{


  let userDal = await usersDal.getUsersDal()
  users = userDal.users
  let fndUser = users.find( usr => usr.id ==idval)
  

  let perDal = await permissionsDal.getPermissionsDal()
  let permissions = perDal.permissions
let fndPer = permissions.find( per => per.id ==idval)


let obj = {

  name: fndUser.firstname + " " + fndUser.lastname,
  sessTime:fndUser.SessionTimeOut,
  permissions: fndPer.permissions

}
  return  obj

}
catch(err){
  console.log(err)
}
}


module.exports = { authCheck, checkAdmin,checkUserExsitsAnUpdate,getUserDetails };
