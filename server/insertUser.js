var Models = require('./models.js')

module.exports.createUser = function( callback ) {
    let Admin = new Models.User({
        id: Math.floor(Math.random() * 100),
        name: 'Administrator',
        user: 'admin',
        password: 'admin',
        email: 'admin@node.com',
        status: 'Enable'
    })

    Admin.save((error) => {
        if(error) callback(error)
        callback(null, "User admin was created!")
    })
}