const db = require('../models/dream');

const getDream = (req, res) => {
  db.find({}, (err, result) => {
    if (!err) {
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

const newDream = (req, res) => {
  db.create({
    dream: req.body.dream,
  }, (err, result) => {
    if (!err) {
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

module.exports = {
  getDream, newDream
}
