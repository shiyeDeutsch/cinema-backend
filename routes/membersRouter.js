let express = require('express')
let moviesBL = require('../models/membersBL')
let router = express.Router();

router.route('/').get( async (req, resp, next) => {
    let movies = await moviesBL.getMembers()
    return resp.json(movies);
})

router.route('/:id').get( async (req, resp, next) => {
    try{
           let movie = await moviesBL.getMember(req.params.id)

    return resp.json(movie);
    }
 catch(err)
 {
    return resp.json(err.message);
 }
})

router.route('/add').post( async (req, resp, next) => {

    console.log(req.body)
   
    let status = await moviesBL.addMember(req.body)
    return resp.send(status);
})

router.route('/delete/:id').delete( async (req, resp, next) => {

    let status = await moviesBL.deleteMember(req.params.id)
    return resp.send(status);
})

router.route('/update/:id').put( async (req, resp, next) => {

    let status = await moviesBL.updateMember(req.params.id,req.body)
    return resp.send(status);
})
module.exports=router