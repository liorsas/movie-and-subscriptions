const userModelBL = require("../models/userModelBL");
const userFileDal = require("../DALs/usersFileDal");
const permissionsFileDal = require("../DALs/permissionsFileDal");
const writeToUserFileDal = require("../DALs/writeToUserFileDal");
const writeToPermissionsDal = require("../DALs/writeToPermissionsFileDal");

const mongoose = require("mongoose");

async function getUsers() {
  try{
  let usersArr = [];
  //get users from jsonfile

  let usersFile = await userFileDal.getUsersDal();
  usersF = usersFile.users;

  //get permissoions

  let permFile = await permissionsFileDal.getPermissionsDal();
  let permissionsF = permFile.permissions;

  //get users form db

  let usersDB = await userModelBL.getUsersDb();
  //console.log(usersDB)

  usersF.forEach((el) => {
    let obj = {};
    obj.id = el.id;
    obj.firstname = el.firstname;
    obj.lastname = el.lastname;
    obj.createdate = el.createdate;
    obj.SessionTimeOut = el.SessionTimeOut;

    let permissionJf = permissionsF.find((prm) => prm.id == el.id);
    obj.permissions = permissionJf.permissions;

    let usersDBfND = usersDB.find((usr) =>
      mongoose.Types.ObjectId(usr.id).equals(el.id)
    );

    obj.username = usersDBfND.username;

    usersArr.push(obj);
  });

  return usersArr;
}
catch(err){
  console.log(err)
}
}

async function getUser(idVal) {
  try{
  let obj = {
    id: idVal,
  };
  //get user from jsonfile

  let usersFile = await userFileDal.getUsersDal();
  let usersF = usersFile.users;

  userF = usersF.find((elU) => elU.id == idVal);
  obj.firstname = userF.firstname;
  obj.lastname = userF.lastname;
  obj.createdate = userF.createdate;
  obj.SessionTimeOut = userF.SessionTimeOut;

  //get permissoions of the unique user

  let permFile = await permissionsFileDal.getPermissionsDal();
  let permissionsF = permFile.permissions;

  let permissionF = permissionsF.find((elP) => elP.id == idVal);
  obj.permissions = permissionF.permissions;

  //get users form db

  let usersDB = await userModelBL.getUserDB(idVal);
  //console.log(usersDB)

  //let usersDBfND = usersDB.find((usrDB) =>
  //  usrDB.id ==idVal
  // );

  // obj.username = usersDBfND.username;
  obj.username = usersDB.username;

  return obj;
}
catch(err){
  console.log(err)
}
}

async function updateUser(idVal, obj) {
  try{
  //check if userDB is update
  let updUserFile = false;
  let updPer = false;
  let updDB = false;
  let checkUnd = false;
  let checkUnd2 = false;
  let differ = 0 ;
  let chkIfPer = false


  let user = await userModelBL.getUserDB(idVal);
  //console.log(user);

  if (user.role !== "Admin") {
    if (user.username !== obj.uname && obj.uname !== undefined) {
      let dbObj = {
        username: obj.uname,
        passward: user.passward,
      };
      let updDB = true;

      //console.log(dbObj)

      let resp = await userModelBL.updateUserBYid(idVal, dbObj);
    }
    //check if user.json is update

    let usersFileD = await userFileDal.getUsersDal();
    let usersF = usersFileD.users;

    let UserIndex = usersF.findIndex((el) => el.id == idVal);

    if (usersF[UserIndex].firstname !== obj.fname) {
      usersF[UserIndex].firstname = obj.fname;
      updUserFile = true;
    }

    if (usersF[UserIndex].lastname !== obj.lname) {
      usersF[UserIndex].lastname = obj.lname;
      updUserFile = true;
    }

    if (usersF[UserIndex].SessionTimeOut !== obj.sess) {
      usersF[UserIndex].SessionTimeOut = obj.sess;
      updUserFile = true;
    }

    if (updUserFile) {
      usersFileD.users = [...usersF];
      console.log(usersFileD.users);

      let writeToUserFile = await writeToUserFileDal.writeToUserFile(
        usersFileD
      );
    }
    let perFileDal = await permissionsFileDal.getPermissionsDal();
    let perArr = perFileDal.permissions;

    let fndPer = perArr.find((el) => el.id == idVal);

    //console.log( fndPer.permissions.length)

    if (fndPer.permissions == undefined) {
      checkUnd = true;
    
    }

    if (obj.permittions == undefined) {
      checkUnd2 = true;
    }


    if(checkUnd == true &&  checkUnd2 == false ){
      fndPer.permissions = obj.permittions;
      chkIfPer = true
    }

    if(checkUnd == false &&  checkUnd2 == true ){
      fndPer.permissions = obj.permittions;
      chkIfPer = true
    }
    
if(checkUnd == false &&  checkUnd2 == false)
{
 
for(let i =0 ; i< fndPer.permissions.length ; i++){
  console.log(fndPer.permissions[i].localeCompare(obj.permittions[i]))
if(fndPer.permissions[i].localeCompare(obj.permittions[i]) == -1 ||  fndPer.permissions[i].localeCompare(obj.permittions[i]) == 1)
{

differ = 2


}



}

if(differ == 2){
  fndPer.permissions = obj.permittions;
  chkIfPer = true
}

  


}

//console.log(checkUnd,checkUnd2,chkIfPer,differ)
    

      if( chkIfPer == true)
{
      let fndPerInd = perArr.findIndex((el) => el.id == idVal);
      perArr[fndPerInd] = fndPer;

      perFileDal.permissions = [...perArr];

      //console.log(perFileDal.permissions)
      updPer = true;

      let writeToPer = await writeToPermissionsDal.writeToPermissionsFile(
        perFileDal
      );
      
  }

    if (updUserFile == true || updPer == true || updDB == true) {
      return true;
    }
  }
    return false


}
catch(err){
  console.log(err)
}
  }


async function addUserTOfileAnDB(obj) {
  try{

  // add user to db

  let userNewId = await userModelBL.addUser(obj);

  //calc current date :

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  //get users.json and add user details

  let usersFileJs = await userFileDal.getUsersDal();
  let userJs = usersFileJs.users;

  let userJsObj = {
    id: userNewId.toString(),
    firstname: obj.fname,
    lastname: obj.lname,
    SessionTimeOut: obj.sess,
    createdate: today,
  };

  userJs.push(userJsObj);

  usersFileJs.users = [...userJs];

  let writeToUserJSFile = await writeToUserFileDal.writeToUserFile(usersFileJs);

  //console.log(usersFileJs.users)

  //get permissions and add user

  let perJsDal = await permissionsFileDal.getPermissionsDal();
  let perJsArr = perJsDal.permissions;

  let perJsObj = {
    id: userNewId.toString(),
    permissions: obj.permittions,
  };

  perJsArr.push(perJsObj);

  perJsDal.permissions = [...perJsArr];

  let writeToPerJs = await writeToPermissionsDal.writeToPermissionsFile(
    perJsDal
  );

  return userNewId;
  }
  catch(err){
    console.log(err)
  }
}


//delete user 

async function deleteUserFromSources(idval){
try{
  //check user role

  let userDB  = await userModelBL.getUserDB(idval)

  console.log(userDB.role)


if(userDB.role !=='Admin')
{
  //delete from usersDB
let resp = await userModelBL.deleteUserDB(idval)

//delete from usersJs

let usersFileD = await userFileDal.getUsersDal();
    let usersF = usersFileD.users;

 let filterUsers =    usersF.filter(el=> el.id !==idval)

 usersFileD.users = [... filterUsers];

  let writeToUserJSFile = await writeToUserFileDal.writeToUserFile(usersFileD);


  //delete user permissions 

  let perJsDal = await permissionsFileDal.getPermissionsDal();
  let perJsArr = perJsDal.permissions;

  let filterPerm  = perJsArr.filter(el => el.id !== idval)

  perJsDal.permissions = [...filterPerm]

  let writeToPerJs = await writeToPermissionsDal.writeToPermissionsFile(
    perJsDal
  );
  return  resp
  }
  return false
}
catch(err){
  console.log(err)
}
}

module.exports = { getUsers, getUser, updateUser, addUserTOfileAnDB,deleteUserFromSources };
