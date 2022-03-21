let mongoose = require('mongoose');
let personSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    city: String,
    age: Number
})

module.exports= mongoose.model('persons',personSchema)