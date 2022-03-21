let axios = require('axios')
exports.getAllMembers=function()
{
    return axios.get('https://jsonplaceholder.typicode.com/users')
}

exports.getAllMovies=function()
{
    return axios.get('https://api.tvmaze.com/shows')
}
