//const fetch = require('node-fetch')
const axios = require('axios')

async function getMembersFromWs(){

    let resp =  await axios("http://localhost:3001/api/members");
    let members = resp.data

    return members

}

async function getMemberFromWs(idval){

    let resp =  await axios("http://localhost:3001/api/members/"+idval);
    let member = resp.data
    
    
    return member

}

async function updateMember(idval,obj){

let newObj = {

    name: obj.memname,
    email:obj.mememail,
    city:obj.memcity
}


    let resp = await axios({
        method: "put",
        url: "http://localhost:3001/api/members/" +idval,
        data:newObj ,
         headers: {'Content-Type' : 'application/json'},
    })

    return resp.data

}

async function deleteMember(idval){

    let resp = await axios({
        method: "delete",
        url: "http://localhost:3001/api/members/" +idval,
       
         headers: {'Content-Type' : 'application/json'},
    })
    return resp.data

}


async function addMember(obj){

    let newObj = {
        name:obj.memname,
        email:obj.mememail,
        city:obj.memcity
        
        }



    let resp = await axios({
        method: "post",
        url: "http://localhost:3001/api/members" ,
        data:newObj ,
         headers: {'Content-Type' : 'application/json'},
    })
    return resp.data


}

module.exports = {getMembersFromWs,getMemberFromWs,updateMember,deleteMember,addMember}