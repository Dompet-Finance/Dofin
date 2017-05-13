const User = require('../models/User');
const Ctl = {}

Ctl.insert = (req, res) => {
  User.create(req.body, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // insert

Ctl.getAll = (req, res) => {
  User.find({}, (err, recs) => {
    if (err) res.send(err)
    else res.json(
      recs.map(rec => {
        let obj = {}
        obj._id = rec._id
        obj.email = rec.email
        obj.categories = rec.categories
        return obj
      })
    )
  })
}, // getAll

Ctl.getById = (req, res) => {
  User.findById(req.params.id, (err, rec) => {
    if (err) res.send(err)
    else {
      let obj = {}
      obj._id = rec._id
      obj.email = rec.email
      obj.categories = rec.categories
      res.json(obj)
    }
  })
}, // getById

Ctl.updateById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
}, // updateById

Ctl.deleteById = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // deleteById

module.exports = Ctl