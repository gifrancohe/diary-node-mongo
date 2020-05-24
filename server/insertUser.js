var User = require('./models.js')

module.exports.createUser = function( callback ) {
    let Admin = new User({
        name: 'Administrator',
        user: 'admin',
        password: 'admin123',
        email: 'admin@node.com'
    })

    Admin.save((error) => {
        if(error) callback(error)
        callback(null, "User created!")
    })
}