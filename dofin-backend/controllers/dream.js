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
    record_by: req.body.record_by,
    dream: req.body.dream,
  }, (err, result) => {
    if (err) {
      res.send(err)
    }else{
      res.send(result)
    }
  })
}

module.exports = {
  getDream, newDream
}
