var express = require('express');
var router = express.Router();
const loginBL = require("../BLs/loginBL")
const moviesBL = require("../BLs/moviesBL")

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
  let chkMovie =true

  let adminval = false ;
  let sess = req.session;
  let check = await loginBL.authCheck(sess)
  if (check){
    let adminCheck = await loginBL.checkAdmin(sess);
    if(adminCheck){
      adminval = true
    }

    
    let moviesResp = await moviesBL.getAllMovies()
   

    if(!moviesResp)
{
  chkMovie =  false
}
    //console.log(moviesResp[0])

    let permit = sess.perm
    let name = sess.name;

    let activm = "activm"
    let activs = ''
    let activu = ''

    

    res.render("movies",{movies:moviesResp,admin:adminval,movieFlag:chkMovie,permit:permit,name:name,activm,activu,activs })

  }
  else{
res.redirect("/")

  }
}
catch(err){
  console.log(err)
  }
  })


  //find button

router.post("/search",async function(req, res, next){
try{
  let chkMovie =true
  let adminval = false ;
  let sess = req.session;
  let check = await loginBL.authCheck(sess)
  if (check){
    let adminCheck = await loginBL.checkAdmin(sess);
    if(adminCheck){
      adminval = true
    }

 let fndName = req.body;
console.log(fndName)
if(fndName.name !== '')
{
//let resp = await moviesBL.getMovieByName(fndName.name)
let resp = await moviesBL.searchMovies(fndName.name)
if(resp.length == 0)
{
  chkMovie =  false
}

let permit = sess.perm
let name = sess.name;

let activm = "activm"
let activs = ''
let activu = ''


res.render("movies",{movies:resp,admin:adminval,movieFlag:chkMovie ,permit:permit,name:name,activm,activu,activs })
}

  }
  else{
    res.redirect("/")
  }
}
catch(err){
console.log(err)
}

})
 // add movie page

router.get("/addmovie",async function(req, res, next){
  try{

  
  let chkMovie =true
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

    let activm = "activm"
    let activs = ''
    let activu = ''

res.render("createmovie",{admin:adminval,permit:permit,name:name,activm,activu,activs })
  }
  else {
    res.redirect("/")
  }
}
catch(err){
  console.log(err)
}
})

// save new movie 

router.post("/addmovie/save",async function(req, res, next){
  try{
  let chkMovie =true
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
    if(data.save){
    //  console.log(data)
    let resp = moviesBL.addMovieToDataBase(data)
    res.redirect("/movies")

    }


if(data.cancel){
  //console.log(data)
  res.redirect("/movies")

}

  }
  else{
    res.redirect("/")
  }
}
catch(err){
  console.log(err)
}

})

// edit button
router.post("/edit",async function(req, res, next){
  try{

  let chkMovie =true
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
    //console.log(idval)
    let resp = await moviesBL.getMoviebyIdDB(idval)
    //console.log(resp)
    let permit = sess.perm
    let name = sess.name;

       let activm = "activm"
    let activs = ''
    let activu = ''

    res.render("editmovie",{movie:resp,admin:adminval,permit:permit,name:name,activm,activu,activs })
  }
else {
  res.redirect("/")
}

}
catch(err){
  console.log(err)
}
})

router.post("/save/:id",async function(req, res, next){
  try{
  let chkMovie =true
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
      let id = req.params.id

      let resp = await moviesBL.updateMovie(id,data)

      res.redirect("/movies")




    }
    if(data.cancel){
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

})


router.post("/delete",async function(req, res, next){
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
    //console.log(idval)
    let resp = await moviesBL.deleteMoviesAll(idval)
    console.log(resp)
    res.redirect("/movies")
  }

else{

res.redirect("/")
}

  }
  catch(err){
    console.log(err)
  }
})

//link to movie 

router.get("/movie/:id",async function(req, res, next){
  try{
  let chkMovie =true
  let adminval = false ;
  let moviesArr = []

  let sess = req.session;
  

  let check = await loginBL.authCheck(sess)
  if (check){
    let adminCheck = await loginBL.checkAdmin(sess);
    if(adminCheck){
      adminval = true

    }
    let idval = req.params.id

    let resp = await moviesBL.searchMovieById(idval)

    //console.log(resp)
   if(!resp)
   {
     chkMovie =false
   }
 
   //console.log(resp)

   let permit = sess.perm 
   let name = sess.name;

   let activm = "activm"
   let activs = ''
   let activu = ''


   if(permit.includes("view-movies")){
    res.render("movies",{admin:adminval , movies:resp , movieFlag:chkMovie,permit:permit,name:name,activm,activu,activs })
   }
   else{
     
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

router.get("/movie/movies/addmovie",async function(req, res, next){
  try{

  
    let chkMovie =true
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
  
      let activm = "activm"
      let activs = ''
      let activu = ''
  
  res.render("createmovie",{admin:adminval,permit:permit,name:name,activm,activu,activs })
    }
    else {
      res.redirect("/")
    }
  }
  catch(err){
    console.log(err)
  }


})




module.exports = router;
