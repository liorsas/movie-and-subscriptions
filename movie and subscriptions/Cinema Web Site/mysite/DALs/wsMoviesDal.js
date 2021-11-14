
const axios = require('axios')



async function getMoviesFromWs(){

    let resp =  await axios.get("http://localhost:3001/api/movies");
    let movies = resp.data

    return movies

}

async function getMoviesByNameFromWs(moviename){

    let name = moviename.charAt(0).toUpperCase() + moviename.slice(1)
    console.log(name)

    let resp =  await axios.get("http://localhost:3001/api/movies?name=" + name);
    let movie = resp.data
    
    
    return movie

}

async function getMovieById(idval){
    
let resp = await axios.get("http://localhost:3001/api/movies/" + idval)
let movie = resp.data
//console.log(movie)

return movie;
    



    

}


async function addMovieToDB(obj){

    let newObj = {
        name: obj.mname,
        genres: obj.gener.split(","),
        image: obj.mimage,
        premiered:obj.mdate

    }


    let resp = await axios({
        method: "post",
        url: "http://localhost:3001/api/movies",
        data:newObj ,
         headers: {'Content-Type' : 'application/json'},
    })
    return resp.data

}


async function updateMovieDB(idval,obj){

    let newObj = {
        name: obj.mname,
        genres:obj.gener.split(","),
        image:obj.mimage,
        premiered: obj.premiered
    }

  

    let resp = await axios({
        method:"put",
        url:  'http://localhost:3001/api/movies/' + idval,
        data:newObj ,
         headers: {'Content-Type' : 'application/json'},


    })
    return resp.data
}

async function deleteMovieFromMoviesDB(idval){

    let resp = await axios({
        method:"delete",
        url:  'http://localhost:3001/api/movies/' + idval,
        
         headers: {'Content-Type' : 'application/json'},

         

    })

    return resp.data
}

module.exports = {getMoviesFromWs,getMoviesByNameFromWs,getMovieById,addMovieToDB,updateMovieDB,deleteMovieFromMoviesDB}