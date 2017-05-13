const mongoose = require('mongoose'),
      db  = require("./db");

const expenseSchema = mongoose.Schema({
  record_by: {
    type: mongoose.Schema.Types.ObjectId,
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
  category: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
})

const Expense = db.model('Expense', expenseSchema)

module.exports = Expense