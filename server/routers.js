var     express = require('express'),
        Router  = express.Router()

var getData = require('./getData.js')

Router.get('/events/all/:user', (req, res) => {
    let user = req.params.user
    getData.getEvents(user)
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

Router.post('/events/saveEvent', (req, res) => {
    
    getData.setEvent(req.body, function(response) {
        if(response.code == 200) {
            res.json(response)
        }else {
            console.log('Error: ' + response.message)
            res.sendStatus(500).json(response)
        }
    })
})

Router.post('/events/delete/:eventid', (req, res) => {
    
    getData.deleteEvent(req.body, function(response) {
        if(response.code == 200) {
            res.json(response)
        }else {
            console.log('Error: ' + response.message)
            res.sendStatus(500).json(response)
        }
    })
})

Router.post('/events/update/:eventid', (req, res) => {
    
    getData.updateEvent(req.body, function(response) {
        if(response.code == 200) {
            res.json(response)
        }else {
            console.log('Error: ' + response.message)
            res.sendStatus(500).json(response)
        }
    })
})


module.exports = Router

