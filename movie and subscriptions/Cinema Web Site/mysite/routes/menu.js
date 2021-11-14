var express = require('express');
var router = express.Router();
const loginBL = require("../BLs/loginBL")
const moviesBL = require("../BLs/moviesBL")

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{

  let adminval = false ;

  let sess = req.session;
  console.log(sess)
  

  let check = await loginBL.authCheck(sess)
  if (check){
    let adminCheck = await loginBL.checkAdmin(sess);
    if(adminCheck){
      adminval = true

    }
   
    let permit = sess.perm
    //console.log(permit)
    let name = sess.name;

    let activm = ''
    let activs = ''
    let activu = ''

  

    res.render("menu",{admin:adminval, permit:permit ,name:name,activm,activs,activu})

  }
else {
  res.redirect("/" )
}

  }
  catch(err){
    console.log(err)
  }

  })

router.get('/users', function(req, res, next) {

res.redirect("/users")

})

/// movies process
router.get("/movies", function(req, res, next){

  res.redirect("/movies")



  
})



router.get("/subscriptions",function(req, res, next){

  res.redirect("/subscriptions")

})
 


module.exports = router;
