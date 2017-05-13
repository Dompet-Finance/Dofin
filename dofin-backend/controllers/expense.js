const Expense = require('../models/expense')
const mongoose = require('mongoose')

const newExpense = (req, res) => {
  Expense.create({
    record_by: req.body.record_by,
    amount: req.body.amount,
    description: req.body.description,
    items: req.body.items,
    category: req.body.category,
    date: req.body.date,
    location: req.body.location,
  }, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // newExpense

const getTotalAmountById = (req, res) => {
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
} // getTotalAmountById

const getExpensesById = (req, res) => {
  Expense.find({record_by: req.params.user_id}, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // getExpensesById

const updateById = (req, res) => {
  Expense.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // updateById

const removeExpenseById = (req, res) => {
  Expense.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // removeExpenseById

module.exports = {
  newExpense,
  getTotalAmountById,
  getExpensesById,
  removeExpenseById,
}