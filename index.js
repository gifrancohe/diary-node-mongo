var bodyParser   = require('body-parser'),
    http         = require('http'),
    express      = require('express'),
    mongoose     = require('mongoose')

var url = "mongodb://localhost/diary"

var port         = port = process.env.PORT || 3000, 
    app          = express(),
    Server       = http.createServer(app)     

var Routers = require('./server/routers.js')
var Insert  = require('./server/insertUser.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('client'))

app.use('/diary', Routers)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

Insert.createUser((error, result) => {
    if(error) console.log(error)
    console.log(result)
})

Server.listen(port, function(){
  console.log('Server is listeing in port: ' + port)
})
