const membersWsDal = require('../DALs/membersWsDAL');
const membersModel = require('../models/membersModel')
const moviesWsDal = require('../DALs/moviesWsDal');
const moviesModel = require('../models/moviesModel')


 /// pull ws of users to DB

function getMembersFromDB() {

    return new Promise((resolve,reject)=>{

        membersModel.find({},function(err,data) {
 if(err) {
     reject(err)
 }
 else {
     resolve(data)
 }


        })


    } )

}


 function saveMemberTODB(){

return new Promise(async(resolve,reject) => {

    let dataDB = await getMembersFromDB()

if(!dataDB[0] )
   {
let resp = await membersWsDal.getMembersFromWs() 
let members = resp.data; 

console.log("test")



members.forEach(el => {
 
    let obj = new membersModel({
 name: el.name,
 email:el.email,
 city: el.address.city
    })

    obj.save(function(err){

        if(err){
            reject(err)
        }

        else {
            resolve("created")
        }
    })

 });
   }
})
}



function getMoviesFromDB() {

    return new Promise((resolve,reject)=>{

        moviesModel.find({},function(err,data) {
 if(err) {
     reject(err)
 }
 else {
     resolve(data)
 }


        })


    } )

}

// pull movies to db

 function saveMoviesTODB(){

return new Promise(async(resolve,reject) => {

    let dataDB = await getMoviesFromDB()

if(!dataDB[0] )
   {
let resp = await moviesWsDal.getMoviessFromWs()
let movies = resp.data; 

console.log("test")



movies.forEach(el => {
 
    let obj = new moviesModel({
 name: el.name,
 genres:el.genres,
 image: el.image.medium,
 premiered:el.premiered
    })

    obj.save(function(err){

        if(err){
            reject(err)
        }

        else {
            resolve("created")
        }
    })

 });
   }
})
}





module.exports = {saveMemberTODB,saveMoviesTODB}