const axios = require('axios');

function getMoviessFromWs(){

    return axios.get("https://api.tvmaze.com/shows") 

} 

module.exports = {getMoviessFromWs}