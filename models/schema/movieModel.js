let mongoose = require('mongoose')
let movieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    image: String,
    premiered: String
})
module.exports = mongoose.model('movies', movieSchema)