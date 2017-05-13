const mongoose = require('mongoose')
const Schema = mongoose.Schema

let expenseSchema = new Schema({
  record_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [{
    item_name: {
      type: String,
    },
    price: {
      type: Number,
    },
  }],
  categories: [{
    type: String,
  }],
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
})

let Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense