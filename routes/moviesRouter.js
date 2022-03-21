let express = require('express')
let moviesBL = require('../models/moviesBL')
let router = express.Router();

router.route('/').get( async (req, resp, next) => {
    let movies = await moviesBL.getMovies()
    return resp.json(movies);
})

router.route('/master').get( async (req, resp, next) => {
    let movies = await moviesBL.getMasterMovies()
    return resp.json(movies);
})


router.route('/:id').get( async (req, resp, next) => {
    let movie = await moviesBL.getMovie(req.params.id)
    return resp.json(movie);
})

router.route('/add').post( async (req, resp, next) => {

    console.log(req.body)
   
    let status = await moviesBL.addMovie(req.body)
    return resp.send(status);
})

router.route('/delete/:id').delete( async (req, resp, next) => {

    let status = await moviesBL.deleteMovie(req.params.id)
    return resp.send(status);
})

router.route('/update/:id').put( async (req, resp, next) => {

    let status = await moviesBL.updateMovie(req.params.id,req.body)
    return resp.send(status);
})
module.exports=router