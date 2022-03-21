let express = require('express')
let subscriptionsBL = require('../models/subscriptionsBL')
let router = express.Router();

router.route('/').get( async (req, resp, next) => {
    let Subscriptions = await subscriptionsBL.getAllSubscriptions()
    return resp.json(Subscriptions);
})

router.route('/:id').get( async (req, resp, next) => {
    let movie = await subscriptionsBL.getMovie(req.params.id)
    return resp.json(movie);
})

router.route('/add').post( async (req, resp, next) => {

    console.log(req.body)
   
    let status = await subscriptionsBL.addMovie(req.body)
    return resp.send(status);
})

router.route('/delete/:id').delete( async (req, resp, next) => {

    let status = await subscriptionsBL.deleteMovie(req.params.id)
    return resp.send(status);
})

router.route('/update/:id').put( async (req, resp, next) => {

    let status = await subscriptionsBL.updateMovie(req.params.id,req.body)
    return resp.send(status);
})
module.exports=router