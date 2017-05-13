const mongoose = require('mongoose');

module.exports = mongoose.connect("mongodb://tngmichael:1234cluster@cluster0-shard-00-00-ldzrg.mongodb.net:27017,cluster0-shard-00-01-ldzrg.mongodb.net:27017,cluster0-shard-00-02-ldzrg.mongodb.net:27017/dofin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", err =>
  err === undefined ? console.log('DB connected'):console.log('ERROR'))