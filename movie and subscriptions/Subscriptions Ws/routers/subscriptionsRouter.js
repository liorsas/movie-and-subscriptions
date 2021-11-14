const express = require('express')

const subscriptionsBL = require('../BL/subscriptionsBL')

const router = express.Router();

router.route('/').
 get( async function(req,resp){

    
if(req.query.movieid)
{
    let movieid = req.query.movieid
let subscriptions = await subscriptionsBL.getSubscriptionsSearchByMovieId(movieid)
return resp.json(subscriptions)
}
if(req.query.memberid){

  let memberid = req.query.memberid
  let subscriptions = await subscriptionsBL.getSubscriptionsSearchByMemberId(memberid)
  return resp.json(subscriptions)

}


else{
 let subscriptions = await subscriptionsBL.getSubscriptions()
  return resp.json(subscriptions)
}

 })

 router.route('/:id').
 get(async function(req,resp){
 
 let idval = req.params.id   
 
 let subscription = await subscriptionsBL.getSubscription(idval)
 return resp.json(subscription)
 
 })


router.route('/').
post(async function(req,resp){

let data = req.body; 


let status = await subscriptionsBL.addSubscription(data)
return resp.json(status)


})


router.route('/update/:id').
put(async function(req,resp){

let id = req.params.id;
let data = req.body

let status = await subscriptionsBL.updateSubscription(id,data)
return resp.json(status)
})


router.route('/del/:id').
delete(async function(req,resp){

id = req.params.id 
let status = await subscriptionsBL.deleteSubscription(id)
return resp.json(status)
})


module.exports = router;