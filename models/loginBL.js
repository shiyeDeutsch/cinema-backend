let User = require('./schema/userScheam')
let jsonDAL = require('../DALs/jsonDAL')
let mongoose=require('mongoose')
// let mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/usersDB');

exports.login = async function (obj) {
    
    let userFound = await User.find({ userName: obj.userName, pwd: obj.pwd })



    if (userFound.length >= 1) {
        let userData = await jsonDAL.getByIdFromJson('./files/users.json', userFound[0]._id)
        // console.log(userData)

        let permissionsData = await jsonDAL.getByIdFromJson('./files/permissions.json', userFound[0]._id)
        if (userFound[0].admin) {

            return { valid: true, admin: true, id: userFound[0]._id, permissions: permissionsData.permissions, name: userData.firstName }
        }
        else {
            return { valid: true, admin: false, id: userFound[0]._id, permissions: permissionsData.permissions, name: userData.firstName }
        }
    }
    else {
        return { valid: false }
    }
   
}
this.login({ userName: 'sd', pwd: '1234' }).then(x=>console.log(x))