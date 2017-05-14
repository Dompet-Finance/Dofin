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

const getTotalAmountByMonthById = (req, res) => {
  Income.aggregate(
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

const getTotalAmountByCategoryThisYearById = (req, res) => {
  const year = new Date().getFullYear()
  Income.aggregate(
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
  getTotalAmountByMonthById,
  getTotalAmountByCategoryThisYearById,
  newIncome,
  removeIncomeById,
}
