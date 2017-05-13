const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passwordHash = require('password-hash')

let userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(v)
      },
      message: 'Email must be valid'
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    set: v => passwordHash.generate(v),
  },
  categories: [{
    type: String,
  }],
})

let User = mongoose.model('User', userSchema)

module.exports = User
