const mongoose = require('mongoose')
const Schema = mongoose.Schema

let incomeSchema = new Schema({
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
  categories: [{
    type: String,
  }],
  date: {
    type: Date,
    required: true,
  },
})

let Income = mongoose.model('Income', incomeSchema)

module.exports = Income