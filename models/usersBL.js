let User = require('./schema/userScheam')
let jsonDAL = require('../DALs/jsonDAL')
const { Mongoose } = require('mongoose')

// let mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/usersDB');


exports.createNewUser = async function (obj) {
    console.log('this the req.body')
    console.log(obj)
    let users = await jsonDAL.readFromJson('./files/users.json')
    let permissions = await jsonDAL.readFromJson('./files/permissions.json')

    let user = new User(
        {
            userName: obj.uname,
            //    pwd:obj.pwd
        });
    let newItem = await user.save()


    let permission;
    if (typeof obj.permission === 'object') {
        permission = obj.permission
    }
    else {
        permission = [obj.permission]
    }

    let newUser =
    {
        id: newItem._id,
        firstName: obj.fname,
        lastName: obj.lname,
        createdDate: '',
        sessionTimeOut: 60
    }


    let newPermission =
    {
        id: newItem._id,
        permissions: permission
    }
    users.push(newUser);
    permissions.push(newPermission);
    await jsonDAL.writeTojson('./files/users.json', users)
    await jsonDAL.writeTojson('./files/permissions.json', permissions)
    return 'Created !'
}
exports.singUp = async function (obj) {

    let user = await User.find({ userName: obj.userName });
    if (user.length >= 1) {
        if (!user[0].pwd) {
            let status = await User.findByIdAndUpdate(user[0]._id, {
                userName: user[0].userName,
                pwd: obj.pwd
            }, (err, doc) => {
                if (err) { return err }
                else { return doc }
            })

            return 'Updated With Id ' + status._id;
        }

    }
    return 'Incorrect Data !'
}
exports.getAllUsers = async function () {
    let usersDB = await User.find({});
    let userData = await jsonDAL.readFromJson('./files/users.json')
    console.log(userData)
    let permissions = await jsonDAL.readFromJson('./files/permissions.json')
    let dataShipping = [];
    userData.forEach((x, y) => {
        dataShipping.push({
            id: x.id,
            name: x.firstName + ' ' + x.lastName,
            userName: usersDB[y].userName,
            sessionTimeOut: x.sessionTimeOut,
            createdDate: x.createdDate,
            permissions: permissions[y].permissions
        })
    });
    return dataShipping
}
exports.getUser = async function (id) {
    let userDB = await User.findById(id);
    let userData = await jsonDAL.getByIdFromJson('./files/users.json', id)
    let permissions = await jsonDAL.getByIdFromJson('./files/permissions.json', id)
    // console.log(userDB)
    // console.log(userData)
    // console.log(permissions)
    let dataShipping = {

        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userDB.userName,
        sessionTimeOut: userData.sessionTimeOut,
        createdDate: userData.createdDate,
        permissions: permissions.permissions
    }

    return dataShipping
}
exports.updateUser = async function (id, obj) {

    console.log(id, obj)
    let users = await jsonDAL.readFromJson('./files/users.json')
    let permissions = await jsonDAL.readFromJson('./files/permissions.json')
    let userIndex = users.map(x => x.id).indexOf(id);
    let permissionsIndex = permissions.map(x => x.id).indexOf(id);


    await User.findByIdAndUpdate(id, {
        userName: obj.userName
    })

    let permission;
    if (typeof obj.permission === 'object') {
        permission = obj.permission
    }
    else {
        permission = [obj.permission]
    }

    users[userIndex].firstName = obj.fname
    users[userIndex].lastName = obj.lname
    users[userIndex].sessionTimeOut = obj.sessionTimeOut




    permissions[permissionsIndex].permissions = permission


    await jsonDAL.writeTojson('./files/users.json', users)
    await jsonDAL.writeTojson('./files/permissions.json', permissions)
    return 'update !'
}
exports.dateteUser = async function (id) {
    let users = await jsonDAL.readFromJson('./files/users.json')
    let permissions = await jsonDAL.readFromJson('./files/permissions.json')
    let userIndex = users.map(x => x.id).indexOf(id);
    let permissionsIndex = permissions.map(x => x.id).indexOf(id);
    users.splice(userIndex)
    permissions.splice(permissionsIndex,1)
    let deletedItem = await User.findByIdAndDelete(id)

    await jsonDAL.writeTojson('./files/users.json', users)
    await jsonDAL.writeTojson('./files/permissions.json', permissions)
    return 'Deleted With Id ' + deletedItem._id
}