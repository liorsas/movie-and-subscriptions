//const fetch = require('node-fetch')
const axios = require('axios')

async function getSubscriptionsFromWs(){

    let resp =  await axios("http://localhost:3001/api/sub");
    let subscript = resp.data

    return subscript

}

// get ws for all the member that shows  a certain movie
async function getSubWithMovId(idval){


    let resp =  await axios("http://localhost:3001/api/sub?movieid=" +idval);
    let movieMembers = resp.data

    return movieMembers

}

async function getSubWithMemberId(idval){


    let resp =  await axios("http://localhost:3001/api/sub?memberid=" +idval);
    let MemberSub = resp.data

    return MemberSub

}


async function updateSuscription(idval,obj){


    

    let resp = await axios({
        method:"put",
        url:  'http://localhost:3001/api/sub/update/' + idval,
        data:obj ,
         headers: {'Content-Type' : 'application/json'},


    })
    return resp.data

}


async function deleteSuscription(idval){

    let resp = await axios({
        method:"delete",
        url:  'http://localhost:3001/api/sub/del/' + idval,
        
         headers: {'Content-Type' : 'application/json'},


    })
    return resp.data

}

function addSubscribe(obj){


   let resp =  axios({
        method:"post",
        url:  'http://localhost:3001/api/sub',
        data:obj ,
         headers: {'Content-Type' : 'application/json'},


    })

}



module.exports = {getSubscriptionsFromWs , getSubWithMovId,getSubWithMemberId,updateSuscription , deleteSuscription,addSubscribe}