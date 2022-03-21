let persons = [
    { id: 1, name: 'shua', age: 20 },
    { id: 2, name: 'bluma', age: 30 },
    { id: 3, name: 'shalome', age: 40 }
]
// let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/presonsDB');

let Person = require('./personModel')

exports.getPersons = () => {

    return new Promise((resolve, reject) => {

        Person.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }

        })

    })

    // return persons;
}
// this.getPersons().then(x=>console.log(x))
exports.getPerson = (id) => {
    return new Promise((resolve, reject) => {

        Person.findById(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }

        })

    })

}

exports.addPerson = (obj) => {

    return new Promise((resolve, reject) => {
        let person = new Person(
            {
                fname: obj.fname,
                lname: obj.lname,
                city: obj.city,
                age: obj.age
            })

        person.save(err => {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created  with id : ' + person._id);

            }
        })
    })

}

exports.updatePerson = (id, obj) => {
    return new Promise((resolve, reject) => {
        let obj1 =
        {
            fname: obj.fname,
            lname: obj.lname,
            city: obj.city,
            age: obj.age
        }

        Person.findByIdAndUpdate(id, obj1, err => {
            if (err) {
                reject(err)
            }
            else {
                resolve('Update');

            }
        })
    })

}
exports.deletePerson = (id) => {
    return new Promise((resolve, reject) => {
        Person.findByIdAndDelete(id, (err,obj) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(`Document With ${obj._id} Deleted`);

            }

        })

    })
}

