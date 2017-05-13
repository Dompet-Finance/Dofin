const Income = require('../models/income');
const mongoose = require('mongoose')

const getIncomeById = (req, res) => {
  Income.find({record_by: req.body.record_by}, (err, recs) => {
    if (err) res.send(err)
    else res.json(recs)
  })
} // getIncomeById

const getTotalAmountByUserId = (req, res) => {
  Income.aggregate(
    [
      {$match: {
        record_by: mongoose.Types.ObjectId(req.params.user_id)
      }},
      {$group: {
        _id: '$record_by',
        total_amount: { $sum: "$amount" },
      }}
    ])
      .exec((err, rec) => {
        if (err) res.send(err)
        else res.json(rec)
      })
} // getTotalAmountByUserId

const newIncome = (req, res) => {
  Income.create({
    record_by: req.body.record_by,
    amount: Number(req.body.amount),
    description: req.body.description,
    category: req.body.category,
    date: req.body.date
  }, (err, rec) => {
    if (err) {
      res.send(err)
    } else {
      res.json(rec)
    }
  })
} // newIncome

const removeIncomeById = (req, res) => {
  Income.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // removeIncomeById

module.exports = {
  getIncomeById,
  getTotalAmountByUserId,
  newIncome,
  removeIncomeById,
}
