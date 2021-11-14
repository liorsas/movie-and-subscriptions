var express = require('express');
var router = express.Router();
const loginBL = require("../BLs/loginBL")
const moviesBL = require("../BLs/moviesBL")
const subscriptionBL = require('../BLs/subscriptionBL')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
  let flag = false

  let adminval = false ;

  let sess = req.session;
  

  let check = await loginBL.authCheck(sess)
  if (check){
    let adminCheck = await loginBL.checkAdmin(sess);
    if(adminCheck){
      adminval = true

    }


 
let resp = await subscriptionBL.getAllMembersSub()





let permit = sess.perm
let name = sess.name;

let activs = "activs"
let activm = ''
let activu = ''

    res.render("subscriptions",{members:resp ,admin:adminval ,subflag :flag,permit:permit,name:name,activs,activm,activu })

  }
else {
  res.redirect("/" )
}
  }
  catch(err){
    console.log(err)
  }

  })

  
  router.post("/subscribe/:id",async function(req, res, next){
try{
    let flag = false
    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }
      let data = req.body
      console.log(data)
     
    
     
     const obj = JSON.parse(data.selmov)
     let idval = req.params.id

     let resp = await subscriptionBL.subscribeToMemberNewMovie(idval,obj)

     let permit = sess.perm
     let name = sess.name;

      let activs = "activs"
      let activm = ''
      let activu = ''
     res.render("subscriptions",{members:resp ,admin:adminval,subflag :flag,permit:permit,name:name,activs,activm,activu })
     

    }
else {
  res.redirect("/")
}
}
catch(err){
  console.log(err)
}

  })

  router.post("/editmember",async function(req, res, next){
    try{
    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }

      let obj = req.body

      let idval = obj.id

      let resp = await subscriptionBL.getMemberDetails(idval)
      let permit = sess.perm
      let name = sess.name;

      let activs = "activs"
      let activm = ''
      let activu = ''
      res.render("editmember",{admin:adminval , member:resp,permit:permit ,name:name,activs,activm,activu} )
      //console.log(obj)



    }

    else {
      res.redirect("/")
    }
  }
  catch(err){
    console.log(err)
  }

  } )

  router.post("/updmember/:id" , async function(req, res, next){
try{
    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }
let data = req.body
let idval = req.params.id

console.log(idval)

if(data.update){

  let resp = await subscriptionBL.updateMemberInDB(idval,data)
  console.log(resp)

  res.redirect("/subscriptions")



}

if(data.cancel){
res.redirect("/subscriptions")

}

    }

else {
res.redirect("/")

}

}
catch(err){
  console.log(err)
}
  })

  router.post("/deletemember" , async function(req, res, next) {
try{
    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }

      let obj = req.body

      let idval = obj.id

      let resp = await subscriptionBL.deleteMember(idval)

res.redirect("/subscriptions")

      

      



    }
    else {
      res.redirect("/")
    }

  }
  catch(err){
    console.log(err)
  }
  } )


  router.get("/addmember" ,async function(req, res, next){
    try{
    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }

      let permit = sess.perm
      let name = sess.name;

      let activs = "activs"
      let activm = ''
      let activu = ''
      res.render("addmember",{admin:adminval,permit:permit , name:name,activs,activm,activu })
    }


  }
  catch(err){
    console.log(err)
  }
  })

  router.post("/addmember/new",async function(req, res, next){
try{
    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }
let data = req.body
     
if(data.save){

  let resp = await subscriptionBL.addMemberToDB(data)
  res.redirect("/subscriptions")


}


if(data.cancel){

  res.redirect("/subscriptions")
}


    }

    else {

      res.redirect("/")
    }
  }
  catch(err){
    console.log(err)
  }

  } )


  router.get("/member/:id", async function(req, res, next){
    try{

    let adminval = false ;

    let sess = req.session;
    
  
    let check = await loginBL.authCheck(sess)
    if (check){
      let adminCheck = await loginBL.checkAdmin(sess);
      if(adminCheck){
        adminval = true
  
      }

      

      let idval = req.params.id
      let permit = sess.perm
      let name = sess.name;
      if(permit.includes("view-subscritions")){
let resp = await subscriptionBL.getMemberDetail(idval)
let activs = "activs"
let activm = ''
let activu = ''
res.render("member",{admin:adminval,permit:permit,member:resp,name:name,activs,activm,activu})
      }
      else {
        res.redirect("/movies")
      }



    }

    else { 
      res.redirect("/")
    }
  }
  catch(err){
    console.log(err)
  }
  } )

module.exports = router;
