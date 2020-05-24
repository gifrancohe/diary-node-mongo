var     express = require('express'),
        Router  = express.Router()

var getData = require('./getData.js')

Router.get('/events/all', (req, res) => {
    getData.getEvents()
    .then((result) => {
        res.json(result)
    })
    .catch(function(error){
        console.log("Error: " + error)
        res.sendStatus(500).json(erorr)
    })
    
})

Router.post('/login', (req, res) => {
    getData.getUser(req.body)
    .then((result) => {
        res.json(result)
    })
    .catch((error) => {
        console.log('Error: ' + error)
        res.sendStatus(500).json(error)
    })
})

module.exports = Router

