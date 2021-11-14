const userModelBL = require("../models/userModelBL");
const userFileDal = require("../DALs/usersFileDal");
const permissionsFileDal = require("../DALs/permissionsFileDal");
const writeToUserFileDal = require("../DALs/writeToUserFileDal");
const writeToPermissionsDal = require("../DALs/writeToPermissionsFileDal");
const wsMoviesDal = require("../DALs/wsMoviesDal");
const wsSubscriptionsDal = require("../DALs/wsSubscriptionsDal");
const wsMembers = require("../DALs/wsMembersDal");

const mongoose = require("mongoose");

async function getAllMovies() {
  try {
    
    let movies = await wsMoviesDal.getMoviesFromWs();
    

    for (let i = 0; i < movies.length; i++) {
      movies[i].movieMember = await wsSubscriptionsDal.getSubWithMovId(
        movies[i]._id
      );
    }

    for (j = 0; j < movies.length; j++) {
      for (k = 0; k < movies[j].movieMember.length; k++) {
        memID = movies[j].movieMember[k].memberid;

        movies[j].movieMember[k].membername = await wsMembers.getMemberFromWs(
          memID
        );
      }
    }

    let final = movies.map((movie) => ({
      id: movie._id,
      name: movie.name,
      genres: movie.genres,
      image: movie.image,
      premiered: new Date(movie.premiered).getFullYear(),

      movmember: movie.movieMember.map((mov) => ({
        memberid: mov.memberid,
        date: new Date(
          mov.movies.find((el) => el.movieid == movie._id).date
        ).toLocaleDateString("he-IL"),

        membername: mov.membername.name,
      })),
    }));

    return final;
  } catch (err) {
    console.log(err);
  }

}

async function getMovieByName(moviename) {

  try{
  let movie = await wsMoviesDal.getMoviesByNameFromWs(moviename);

  //console.log(movie[0]._id)

  if (movie[0] !== undefined) {
    let movies = [];

    movie[0].movieMember = await wsSubscriptionsDal.getSubWithMovId(
      movie[0]._id
    );

    //console.log(movie)

    if (movie[0].movieMember !== undefined) {
      for (let i = 0; i < movie[0].movieMember.length; i++) {
        memID = movie[0].movieMember[i].memberid;

        movie[0].movieMember[i].membername = await wsMembers.getMemberFromWs(
          memID
        );
      }
    }

    if (movie[0].movieMember !== undefined) {
      let final = {
        id: movie[0]._id,
        name: movie[0].name,
        genres: movie[0].genres,
        image: movie[0].image,
        premiered: new Date(movie[0].premiered).getFullYear(),

        movmember: movie[0].movieMember.map((mov) => ({
          memberid: mov.memberid,
          date: new Date(
            mov.movies.find((el) => el.movieid == movie[0]._id).date
          ).toLocaleDateString("he-IL"),

          membername: mov.membername.name,
        })),
      };

      movies[0] = final;

      return movies;
    }

    if (movie[0].movieMember === undefined) {
      let final = {
        id: movie[0]._id,
        name: movie[0].name,
        genres: movie[0].genres,
        image: movie[0].image,
        premiered: new Date(movie[0].premiered).getFullYear(),
      };
      movies[0] = final;

      return movies;
    }
  } else {
    return false;
  }
  }
  catch(err){
    console.log(err)
  }

}

async function addMovieToDataBase(obj) {
  try {
    let resp = await wsMoviesDal.addMovieToDB(obj);
    return resp;
  } catch (err) {
    console.log(err);
  }
}

async function getMoviebyIdDB(idval) {
try{
  
  let movie = await wsMoviesDal.getMovieById(idval);
  return movie;
}
catch(err){
  console.log(err)
}
}

async function updateMovie(idval, obj) {
  try{
  let upd = false;

  let exsMovie = await wsMoviesDal.getMovieById(idval);

  if (exsMovie.name !== obj.mname) {
    upd = true;
  }
  if (exsMovie.genres.join(",") !== obj.gener) {
    upd = true;
  }
  if (exsMovie.image !== obj.mimage) {
    upd = true;
  }

  if (upd) {
    let resp = await wsMoviesDal.updateMovieDB(idval, obj);
    return resp;
  }

  if (!upd) {
    return false;
  }

  console.log(upd);
  console.log(exsMovie);
  console.log(obj);

  return false;
}
catch(err){
  console.log(err)
}
}

async function deleteMoviesAll(idval) {

  try{
  //delete movie from collection movies
  let delMovieDB = await wsMoviesDal.deleteMovieFromMoviesDB(idval);

  //deleteor update subscription collection

  let movieMembers = await wsSubscriptionsDal.getSubWithMovId(idval);
  ///console.log(movieMembers)

  if (movieMembers) {
    let newMovieMembers = movieMembers.map((mem) => ({
      _id: mem._id,
      memberid: mem.memberid,
      movies: mem.movies.filter((mov) => mov.movieid !== idval),
    }));

    let moviememID = newMovieMembers.map((mem) => mem._id);

    let finalMmembers = newMovieMembers.map((mem) => ({
      memberid: mem.memberid,
      movies: mem.movies,
    }));

    console.log(moviememID);

    console.log(finalMmembers);

    //console.log(newMovieMembers)

    for (let i = 0; i < finalMmembers.length; i++) {
      if (finalMmembers[i].movies.length > 0) {
        let resp = await wsSubscriptionsDal.updateSuscription(
          moviememID[i],
          finalMmembers[i]
        );
      }

      if (finalMmembers[i].movies.length == 0) {
        let ans = await wsSubscriptionsDal.deleteSuscription(moviememID[i]);
      }
    }

    if (movieMembers) {
      return true;
    } else {
      return;
    }
  }
}
catch(err){
  console.log(err)
}
}

async function searchMovieById(idval) {
  try{
  let movies = [];
  let moviesArr = [];

  let movie = await wsMoviesDal.getMovieById(idval);

  moviesArr[0] = movie;

  moviesArr[0].movieMember = await wsSubscriptionsDal.getSubWithMovId(
    moviesArr[0]._id
  );

  //console.log(moviesArr)

  if (moviesArr[0].movieMember !== undefined) {
    for (let i = 0; i < moviesArr[0].movieMember.length; i++) {
      memID = moviesArr[0].movieMember[i].memberid;

      moviesArr[0].movieMember[i].membername = await wsMembers.getMemberFromWs(
        memID
      );
    }
  }

  let final = {
    id: moviesArr[0]._id,
    name: moviesArr[0].name,
    genres: moviesArr[0].genres,
    image: moviesArr[0].image,
    premiered: new Date(moviesArr[0].premiered).getFullYear(),

    movmember: moviesArr[0].movieMember.map((mov) => ({
      memberid: mov.memberid,
      date: new Date(
        mov.movies.find((el) => el.movieid == moviesArr[0]._id).date
      ).toLocaleDateString("he-IL"),

      membername: mov.membername.name,
    })),
  };

  movies[0] = final;
  return movies;
}
catch(err){
  console.log(err)
}
}

async function searchMovies(name){
  try{

  let movisArr = await wsMoviesDal.getMoviesFromWs();
 // console.log(movisArr)

 let filterMoviesArr = movisArr.filter(movie => (movie.name).toLowerCase().includes(name.toLowerCase()) )
 //console.log(filterMoviesArr)

 for (let i = 0; i < filterMoviesArr.length; i++) {
  filterMoviesArr[i].movieMember = await wsSubscriptionsDal.getSubWithMovId(
    filterMoviesArr[i]._id
  );
}
//console.log(filterMoviesArr)

for (j = 0; j < filterMoviesArr.length; j++) {
  for (k = 0; k < filterMoviesArr[j].movieMember.length; k++) {
    memID = filterMoviesArr[j].movieMember[k].memberid;

    filterMoviesArr[j].movieMember[k].membername = await wsMembers.getMemberFromWs(
      memID
    );
  }
}

let final = filterMoviesArr.map((movie) => ({
  id: movie._id,
  name: movie.name,
  genres: movie.genres,
  image: movie.image,
  premiered: new Date(movie.premiered).getFullYear(),

  movmember: movie.movieMember.map((mov) => ({
    memberid: mov.memberid,
    date: new Date(
      mov.movies.find((el) => el.movieid == movie._id).date
    ).toLocaleDateString("he-IL"),

    membername: mov.membername.name,
  })),
}));

return final

  }
  catch(err){
    console.log(err)
  }
}

module.exports = {
  getAllMovies,
  getMovieByName,
  addMovieToDataBase,
  getMoviebyIdDB,
  updateMovie,
  deleteMoviesAll,
  searchMovieById,
  searchMovies
};
