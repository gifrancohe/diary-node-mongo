var mongoose = require('mongoose')
    Schema   = mongoose.Schema

var userSchema = new Schema({
    name: {type: String, require: true},
    lastname: {type: String, require: false},
    user: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: Number, require: false},
    address: {type: String, require: false}
})

var User = mongoose.model('Users', userSchema)

module.exports = User
