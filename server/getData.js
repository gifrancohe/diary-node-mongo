var Models = require('./models.js')


module.exports = {
    getUser: (data) => {
        return new Promise(function(resolve, reject) {
            Models.User.findOne({user: data.user, password: data.pass, status: 'Enable'}).exec((error, result) => {
                if(error) reject(error)
                if(result != null && result.user && result.password) {
                    var response = {'code': 200, 'message': {'user': result.user, 'name': result.name}}
                }else {
                    var response = {'code': 404, 'message': 'Usuario o contraseña incorrecta.'}
                }
                resolve(response)
            })
        })
    },
    getEvents: (user) => {
        return new Promise(function(resolve, reject) {
            Models.Event.find({owner: user}).exec((error, result) => {
                if(error) reject(error)
                resolve(result)
            })
        })
    },
    setEvent: (data, callback) => {
        let event = new Models.Event({
            id: Math.floor(Math.random() * 10000),
            title: data.title,
            start: data.start,
            end: data.end,
            owner: data.owner
        })
        event.save((error) => {
            if(error)  callback({'code': 500, 'message': 'Ocurrio un error: Error: ' + error})
            callback({'code': 200, 'message': 'event created successfully'})
        })
        
    },
    deleteEvent: (data, callback) => {
        console.log(data)
        Models.Event.deleteOne({id: data.id}, function(err) {
            if(err) callback({'code': 500, 'message': 'Ocurrio un error: Error: ' + error})
            callback({'code': 200, 'message': 'event deleted successfully'})
        })
    },
    updateEvent: (data, callback) => {
        console.log(data)
        Models.Event.update({id: data.id}, {$set: { start: data.start}}, function(err) {
            if(err) callback({'code': 500, 'message': 'Ocurrio un error: Error: ' + error})
            callback({'code': 200, 'message': 'event updated successfully'})
        })
    }

}