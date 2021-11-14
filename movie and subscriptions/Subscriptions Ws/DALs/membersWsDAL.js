const axios = require('axios');

function getMembersFromWs(){

    return axios.get("https://jsonplaceholder.typicode.com/users") 

} 

module.exports = {getMembersFromWs}