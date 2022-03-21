let Subscription = require('./schema/subscriptionsModel')
exports.getAllSubscriptions = async function () {
    return new Promise((resolve, reject) => {
        Subscription.find((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })

}
exports.getSubscription = async function (id) {
    return new Promise((resolve, reject) => {
        Subscription.findById(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })

}
exports.addSubscription = function (obj) {
    return new Promise((resolve, reject) => {
        let newSubscription = new Subscription(
            {
                memberId: obj.memberId,
                movies:[ {
                    dateWatched:String,
                    id: String,
                    name: String,
                    genres: [String],
                    image: String,
                    premiered: String
                }]
            }  
            
    )
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