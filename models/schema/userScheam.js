let mongoose=require('mongoose')
User=new mongoose.Schema({
    userName:String,
    pwd:String,
    admin:Boolean
})

module.exports= mongoose.model('users',User)