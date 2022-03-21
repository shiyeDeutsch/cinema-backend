
let Member = require('./schema/memberModel')
// let mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/subscriptionsDB');


exports.getMembers = function () {
    return new Promise((resolve, reject) => {
        Member.find((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })

}

exports.getMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findById(id,(err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

exports.addMember = function (obj) {
    return new Promise((resolve, reject) => {
        let newMember = new Member(
            {
                name: obj.name,
                email: obj.email,
                city: obj.city  
            })

        newMember.save(err => {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created  with id : ' + newMember._id);

            }
        })
    });
}
// this.addMovie({
//     genres: [
//         'xx',
//         'xx',
//         'xx'
//     ],
//     name:'xx',
//     image: 'xx',
//     premiered: 'xx'
// }).then(x=>console.log(x)).catch(x=>console.log(x))


exports.updateMember = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndUpdate(id,{
            name: obj.name,
            email: obj.email,
            city: obj.city  
        },
         function(err)
        {

            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Updated');
            }
        });
    })
}




exports.deleteMember = function (id) {
    return new Promise((resolve, reject) => 
    {

        Member.findByIdAndDelete(id, err => 
            {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted !');

            }
        })
    });


}