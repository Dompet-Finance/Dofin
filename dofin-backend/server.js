const express  = require('express'),
      app      = express(),
      mongoose = require('mongoose')

let host = 'mongodb://tngmichael:1234cluster@cluster0-shard-00-00-ldzrg.mongodb.net:27017,cluster0-shard-00-01-ldzrg.mongodb.net:27017,cluster0-shard-00-02-ldzrg.mongodb.net:27017/dofin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

// host = 'mongodb://localhost:27017/dofin'
mongoose.Promise = global.Promise
mongoose.connect(host, err =>
  err === undefined ? console.log('DB connected'):console.log('ERROR'))

// NOTE: set
app.set('port', process.env.PORT || 8081)

// NOTE: cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// NOTE: use
app.use(require('morgan')('dev'))
app.use(require('body-parser').urlencoded({ extended: false }))
app.use(require('body-parser').json())
app.use('/', require('./routes'))

// NOTE: run
app.listen(app.get('port'), () => {
  console.log(`Server running!`);
})