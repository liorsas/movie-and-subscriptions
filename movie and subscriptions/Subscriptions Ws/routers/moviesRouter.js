const express = require('express')

const moviesBL = require('../BL/moviesBL')

const router = express.Router();

router.route('/').
get( async function(req,resp){

if(req.query.name){
    let name = req.query.name
let movie = await moviesBL.getMoviesByName(name);
return resp.json(movie)


}
else{

    let movies = await moviesBL.getMovies();
    return resp.json(movies)
}


 


})

router.route('/:id').
get(async function(req,resp){

let idval = req.params.id   

let movie = await moviesBL.getMovie(idval)
return resp.json(movie)

})

router.route('/').
post(async function(req,resp){

let data = req.body; 


let status = await moviesBL.addMovie(data)
return resp.json(status)


})

router.route("/:id").
put(async function(req,resp){

let id = req.params.id;
let obj = req.body

let status = await moviesBL.updateMovie(id,obj)
return resp.json(status)


})

router.route("/:id").
delete(async function(req,resp){

 let id = req.params.id;
 let status = await moviesBL.deleteMovie(id)

 return resp.json(status)



})




module.exports = router;