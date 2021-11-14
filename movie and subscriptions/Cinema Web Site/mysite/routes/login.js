var express = require('express');
var router = express.Router();
const loginBL = require("../BLs/loginBL")
const permissionsDal = require("../DALs/permissionsFileDal")

/* GET home page. */
router.get('/', function(req, res, next) {
err = false
req.session.destroy();

  res.render('login', { err});
});


router.post("/menu",async function(req,res){
  try{
let err = true

  let data = req.body; 
 

  let stat = await loginBL.authCheck(data)
  console.log(stat)



  if(stat){

     
  
    idval = stat._id.toString()

    let UserDetails = await loginBL.getUserDetails(idval)

  


    let sess = req.session;
    if (!sess.username ) {
      sess.username = data.username;
      sess.pass = data.pass;
      sess.name = UserDetails.name,
      sess.sessTime = UserDetails.sessTime
      sess.perm = UserDetails.permissions
  
    sess.cookie.expires =  60000 * parseInt(UserDetails.sessTime)  
     
    }
    
res.redirect("/menu")

  }
  else {

    res.render("login",{err})


  }
}
catch(err){
  console.log(err)
}

})







router.get("/createacc",function(req,res) {
  let error = false

res.render("createacc", {err:error})


})


router .post("/createuser" , async function(req,res){
  try{

  let error = false
let data = req.body;
console.log(data)

let stat = await loginBL.checkUserExsitsAnUpdate(data)
console.log(stat)

if(stat) {

  res.redirect("/")
}

else {

  error = true
  res.render("createacc",{err:error})

}

  }
  catch(err){
    console.log(err)
  }

})


module.exports = router;
