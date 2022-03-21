let Member = require('./memberModel')
let mongoose = require('mongoose');
let jfile = require('jsonfile')
mongoose.connect('mongodb://localhost:27017/subscriptionsDB');
exports.yy = async function () {
    let members = await jfile.readFile('../members.json')
    console.log(members)
  let  member// = new Member()
    members.forEach(x => {
        member = new Member ({
            name: x.name,
            email: x.email,
            city: x.address.city
        });
        member.save()
    });

}

this.yy()