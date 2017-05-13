const mongoose = require('mongoose'),
      db  = require("./db");
const passwordHash = require('password-hash')

const userSchema = mongoose.Schema({
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

const User = db.model('User', userSchema)

module.exports = User
