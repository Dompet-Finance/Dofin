const mongoose = require('mongoose')
const Schema = mongoose.Schema

let dreamSchema = new Schema({
  record_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dream: {
    type: String,
    required: true,
  },
})

let Dream = mongoose.model('Dream', dreamSchema)

module.exports = Dream