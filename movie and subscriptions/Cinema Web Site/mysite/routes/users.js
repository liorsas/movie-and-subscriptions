var express = require("express");
var router = express.Router();
const loginBL = require("../BLs/loginBL");
const userAdminBL = require("../BLs/userAdminBL");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try{
  let adminval = false;
  let sess = req.session;
  let check = await loginBL.authCheck(sess);
  if (check) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      adminval = true;
      //GET USERS FROM ALL THE DATA

      let resp = await userAdminBL.getUsers();
      // console.log(resp)
      let permit = sess.perm
      let name = sess.name;

      let activu = "activu"
      activm = ''
      activs = ''
  

      res.render("users", { users: resp, admin: adminval ,permit:permit ,name:name,activu,activm,activs });
    } else {
      res.redirect("/");
    }
  }
}
catch(err){
  console.log(err)
}
});

router.get("/:id", async function (req, res) {
  try{
  let adminval = false;
  let sess = req.session;
  let check = await loginBL.authCheck(sess);
  if (check) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      adminval = true;

      let id = req.params.id;
     

      let resp = await userAdminBL.getUser(id);
    
      let permit = sess.perm
      let name = sess.name;
      let activu = "activu"
      activm = ''
      activs = ''
  

      res.render("edituser", { user: resp, admin: adminval,permit:permit,name:name,activu,activm,activs  });
    } else {
      res.redirect("/");
    }
  }
}
catch(err){
  console.log(err)
}
});

router.post("/update/:id", async function (req, res) {
  try{
  let adminval = false;
  let sess = req.session;
  let check = await loginBL.authCheck(sess);
  if (check) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      adminval = true;
      id = req.params.id;
      obj = req.body;
     

      let resp = await userAdminBL.updateUser(id,obj)
  

      let ans = await userAdminBL.getUsers();

      let permit = sess.perm
      let name = sess.name;

      let activu = "activu"
      activm = ''
      activs = ''
  

      res.render("users", { users: ans, admin: adminval,permit:permit,name:name,activu,activm,activs  });

    }
    else{
      res.redirect("/");
    }
  }

}
catch(err){
  console.log(err)
}
});


router.get("/add/newuser" , async function (req, res){
  try{
  let adminval = false;
  let sess = req.session;
  let check = await loginBL.authCheck(sess);
  if (check) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      adminval = true;
      let permit = sess.perm
      let name = sess.name;

      let activu = "activu"
      activm = ''
      activs = ''
  

      res.render("adduser",{admin: adminval,permit:permit,name:name,activu,activm,activs  })

    }
    else { 
      res.redirect("/");
    }
  }

  }
  catch(err){
    console.log(err)
  }
})

router.post("/newuser" , async function (req, res){
  try{

  let adminval = false;
  let sess = req.session;
  let check = await loginBL.authCheck(sess);
  if (check) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      adminval = true;
      let obj = req.body;
     
      
      let resp = await userAdminBL.addUserTOfileAnDB(obj)
     

      let ans = await userAdminBL.getUsers();
      let permit = sess.perm
      let name = sess.name;

      let activu = "activu"
      activm = ''
      activs = ''
  
      res.render("users", {admin:adminval,users: ans,permit:permit ,name:name,activu,activm,activs})

      
    }
    else 
    {
      res.redirect("/")
  }
  }
}
catch(err){
  console.log(err)
}
})

 
router.post("/del" , async function (req, res){
  try{

  let adminval = false;
  let sess = req.session;
  let check = await loginBL.authCheck(sess);
  if (check) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      adminval = true;
      obj = req.body
      id= obj.id
      
      let resp = await userAdminBL.deleteUserFromSources(id)
     
      let ans = await userAdminBL.getUsers();
      let permit = sess.perm
      let name = sess.name;
      let activu = "activu"
      activm = ''
      activs = ''
  

      res.render("users",{admin:adminval,users: ans,permit:permit,name:name,activu,activm,activs })

    }
  }
  
  
  }
  catch(err){
    console.log(err)
  }
})




module.exports = router;
