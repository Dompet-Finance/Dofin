const User = require('../models/user')
const passwordHash = require('password-hash')
const Ctl = {}

Ctl.signup = function(req, res) {
  User.findOne({ email: req.body.email })
    .exec((err, rec) => {
      if (err) {
        let message = 'Oops, there is something went wrong. Please contact to administrator'
        res.json({ error: err, message })
      }
      if (rec) {
        let message = `Email '${req.body.email}' has already registered`
        res.json({ message })
      } else {
        User.create(req.body, error => {
          if (error) {
            if (error.name == "ValidationError") {
              let _error = {}
              for (let err in error.errors) {
                _error[err] = error.errors[err].message
              }
              let message = 'Validation Error'
              res.json({ error: _error, message })
            } else {
              let message = 'Oops, there is something went wrong. Please report to administrator'
              res.json({ error, message })
            }
          } else {
            let message = 'Successful registered'
            res.json({ message })
          }
        })
      } // end if
    }) // end exec
} // signup

Ctl.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((err, rec) => {
      if (err || !rec) {
        let message = 'You are not registered'
        res.json({ error: err, message })
      } else {
        let isMatched = passwordHash.verify(req.body.password, rec.password)
        if (isMatched) {
          let message = 'You are succesfully login'
          res.json({ message })
        } else {
          let message = 'Your password is invalid'
          res.json({ message })
        }
      } // end if
    }) // end exec
} // sigin

module.exports = Ctl