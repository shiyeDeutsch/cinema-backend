
let Movie = require('./schema/movieModel')
// let mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/subscriptionsDB');


exports.getMovies = function () {
    return new Promise((resolve, reject) => {
        Movie.find((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })

}

exports.getMasterMovies = function () {
    
      return   Movie.find({},{'name':1})
    

}
exports.getMovie = function (id) {
    return new Promise((resolve, reject) => {
        Movie.findById(id,(err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

exports.addMovie = function (obj) {
    return new Promise((resolve, reject) => {
        let newMovie = new Movie(
            {
                name: obj.name,
                genres: obj.genres,
                image: obj.image,
                premiered: obj.premiered
            })

        newMovie.save(err => {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created  with id : ' + newMovie._id);

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


exports.updateMovie = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndUpdate(id,
        {
            name: obj.name,
                genres: obj.genres,
                image: obj.image,
                premiered: obj.premiered
        }, function(err)
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




exports.deleteMovie = function (id) {
    return new Promise((resolve, reject) => {

        Movie.findByIdAndDelete(id, err => {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted !');

            }
        })
    });


}