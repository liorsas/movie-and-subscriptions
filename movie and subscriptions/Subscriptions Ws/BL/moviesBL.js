const moviesModel = require("../models/moviesModel");

function getMovies() {
  return new Promise((resolve, reject) => {
    moviesModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getMoviesByName(moviename){

return new Promise((resolve,reject) =>{

  moviesModel.find({name:moviename},function(err,data){
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });


  })



}


function getMovie(id) {
  return new Promise((resolve, reject) => {
    moviesModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addMovie(obj) {
  return new Promise((resolve, reject) => {
    let movie = new moviesModel({
      name: obj.name,
      genres: obj.genres,
      image: obj.image,
      premiered: obj.premiered
    });
    movie.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("created");
      }
    });
  });
}

function updateMovie(id, obj) {
  return new Promise((resolve, reject) => {
    let updObj = {
      name: obj.name,
      genres: obj.genres,
      image: obj.image,
      premiered: obj.premiered
    };

    moviesModel.findByIdAndUpdate(id, updObj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("updated");
      }
    });
  });
}

function deleteMovie(id) {
    return new Promise((resolve, reject) => {
      moviesModel.findByIdAndDelete(id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("deleted");
        }
      });
    });
  }

module.exports = { getMovies,getMoviesByName, getMovie, addMovie ,updateMovie,deleteMovie};
