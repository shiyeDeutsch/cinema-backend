let jfile = require('jsonfile')
// require('../files/users.json')

exports.writeTojson = function (path, obj) {

    return new Promise((resolve, reject) => {

        jfile.writeFile(path, obj, err => {

            if (err) {
                reject(err)
            }
            else {
                resolve('Written successfully')
            }
        })
    })
}

exports.readFromJson = async function (path) {
    let obj = await jfile.readFile(path)

    return obj;
}
exports.getByIdFromJson = async function (path, id) {
    try{
        let obj = await jfile.readFile(path)
        let item = obj.find(x => x.id == id)
        return item;
    }
   catch(err)
   {
       return err;
   }
}
