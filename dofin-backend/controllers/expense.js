const Expense = require('../models/expense')
const mongoose = require('mongoose')

const newExpense = (req, res) => {
  console.log(req.body);
  // Expense.create({
  //   record_by: req.body.record_by,
  //   amount: req.body.amount,
  //   description: req.body.description,
  //   items: req.body.items,
  //   category: req.body.category,
  //   date: req.body.date,
  //   location: req.body.location,
  // }, (err, rec) => {
  //   if (err) res.send(err)
  //   else res.json(rec)
  // })
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

const getTotalAmountByMonthById = (req, res) => {
  Expense.aggregate(
    [
      {$project: {
        month: { $month: "$date" },
        year: { $year: "$date" },
        amount: 1, // or
        record_by: 1,
      }},
      {$match: {
        record_by: mongoose.Types.ObjectId(req.params.user_id),
      }},
      {$group: {
        _id: { year: '$year', month: '$month' },
        total_amount: { $sum: "$amount" },
      }},
      {$group: {
        _id: { year: '$_id.year' },
        months: { $addToSet: { month: "$_id.month", total_amount: "$total_amount" } },
      }},
    ])
      .exec((err, rec) => {
        if (err) res.send(err)
        else res.json(rec)
      })
} // getTotalAmountByMonthById

const getExpensesById = (req, res) => {
  Expense.find({record_by: req.params.user_id}, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // getExpensesById

const getTotalAmountByCategoryThisYearById = (req, res) => {
  const year = new Date().getFullYear()
  Expense.aggregate(
    [
      {$project: {
        month: { $month: "$date" },
        year: { $year: "$date" },
        category: '$category',
        amount: 1, // or
        record_by: 1,
      }},
      {$match: {
        record_by: mongoose.Types.ObjectId(req.params.user_id),
        year
      }},
      {$group: {
        _id: { month: '$month', category: '$category' },
        total_amount: { $sum: "$amount" },
      }},
      {$group: {
        _id: { month: '$_id.month' },
        total_amount: { $sum: "$total_amount" },
        categories: { $addToSet: { category: "$_id.category", total_amount: "$total_amount" } },
      }},
    ])
      .exec((err, rec) => {
        if (err) res.send(err)
        else res.json(rec)
      })
} // getTotalAmountByCategoryThisYearById

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
  getTotalAmountByMonthById,
  getTotalAmountByCategoryThisYearById,
  removeExpenseById,
}
