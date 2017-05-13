const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      mongoose    = require('mongoose');

// let host = 'mongodb://tngmichael:1234cluster@cluster0-shard-00-00-ldzrg.mongodb.net:27017,cluster0-shard-00-01-ldzrg.mongodb.net:27017,cluster0-shard-00-02-ldzrg.mongodb.net:27017/dofin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
//
// // host = 'mongodb://localhost:27017/dofin'
// mongoose.Promise = global.Promise
// mongoose.connect(host, err =>
//   err === undefined ? console.log('DB connected'):console.log('ERROR'))

const income = require('./routes/income');
const dream = require('./routes/dream');

app.use(require('morgan')('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', require('./routes'))
app.use("/income", income);
app.use("/dream", dream);

app.listen(8080 || process.env.PORT, () => {
  console.log(`Server running!`);
})
