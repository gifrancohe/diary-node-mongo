var mongoose = require('mongoose')
    Schema   = mongoose.Schema

var userSchema = new Schema({
    id: { type: Number, require: true, unique:true },
    name: {type: String, require: true},
    user: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    status: { type: String, require: true, enum: ['Enable', 'Disable'] },
    lastname: {type: String, require: false},
    phone: {type: Number, require: false},
    address: {type: String, require: false}
})

var eventSchema = new Schema({
    id: { type: Number, require: true, unique:true },
    name: {type: String, require: true},
    startDate: {type: Date, require: true},
    endDate: {type: Date, require: true},
    startTime: {type: Date, require: false},
    endTime: {type: Date, require: false},
    allDay: { type: String, require: false, enum: ['Yes', 'No'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

var User = mongoose.model('Users', userSchema)
var Event = mongoose.model('Events', eventSchema)

module.exports = {
    User: User,
    Event: Event
}
