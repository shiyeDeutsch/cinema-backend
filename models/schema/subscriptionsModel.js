
let mongoose = require('mongoose')
let subscriptionsSchema = new mongoose.Schema({
   
 MemberId :String,
 movies: [{ 
     dateWatched:String,
     id:String,
     name: String,
    genres: [String],
    image: String,
    premiered: String}]// an Array of { movieId : Object Id, date : Date} ) - This field store all the movies
// the member (subscription) watched and their dates
})
module.exports = mongoose.model('subscriptions', subscriptionsSchema)

