const db = require('../models/income');

const getIncome = (req, res) => {
  db.find({}, (err, result) => {
    if (!err) {
      let total = 0;
      result.map((dataResult) => {
        total += dataResult.nominal
      })
      let data = {
        total
      }
      res.send(data)
    }else{
      res.send(err)
    }
  })
}

const newIncome = (req, res) => {
  db.create({
    nominal: Number(req.body.nominal),
    category: req.body.category
  }, (err, result) => {
    if (!err) {
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

module.exports = {
  getIncome, newIncome
}
