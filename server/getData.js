var Models = require('./models.js')


module.exports = {
    getUser: (data) => {
        return new Promise(function(resolve, reject) {
            Models.User.findOne({user: data.user, password: data.pass }).exec((error, result) => {
                if(error) reject(error)
                if(result.user && result.password) {
                    resolve("Validado")
                }else {
                    resolve("Usuario o contraseña incorrecta.")
                }
            })
        })
    },
    getEvents: () => {
        return new Promise(function(resolve, reject) {
            Models.Event.find({}).exec((error, result) => {
                if(error) reject(error)
                resolve(result)
            })
        })
    }
}