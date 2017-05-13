const Expense = require('../models/expense')
const mongoose = require('mongoose')
const Ctl = {}

Ctl.insert = (req, res) => {
  Expense.create(req.body, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // insert

Ctl.totalAmountById = (req, res) => {
  Expense.aggregate(
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
}, // totalAmountById

Ctl.getAll = (req, res) => {
  Expense.find({}, (err, recs) => {
    if (err) res.send(err)
    else res.json(recs)
  })
}, // getAll

Ctl.getAllByUserId = (req, res) => {
  Expense.find({record_by: req.params.user_id}, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
}, // getById

Ctl.updateById = (req, res) => {
  Expense.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
}, // updateById

Ctl.deleteById = (req, res) => {
  Expense.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // deleteById

module.exports = Ctl