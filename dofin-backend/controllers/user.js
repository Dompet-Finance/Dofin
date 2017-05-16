"use strict"

const User = require('../models/user');
const hash = require('password-hash');

const signUpUser = (req, res) => {
  User.create(req.body, (err, rec) => {
    if (err) {
      res.send(err)
    }else {
      res.send(rec)
    }
  })
}

const signInUser = (req, res) => {
  User.findOne({email: req.body.email}, (err, rec) => {
    if (err) {
      res.send(err)
    }else {
      res.send(rec)
    }
  })
}

const getUsers = (req, res) => {
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
} // getUsers

const getUserById = (req, res) => {
  User.findById(req.params.user_id, (err, rec) => {
    if (err) res.send(err)
    else {
      let obj = {}
      obj._id = rec._id
      obj.email = rec.email
      obj.categories = rec.categories
      res.json(obj)
    }
  })
} // getUserById

const insertCategoryById = (req, res) => {
  // belum divalidasi
  User.findByIdAndUpdate(req.params.user_id,
    { $push: { categories: {
      category: req.body.category,
      icon: req.body.icon,
      color: req.body.color,
    }}}, { new: true })
      .exec((err, rec) => {
        if (err) res.send(err)
        else {
          let obj = {}
          obj._id = rec._id
          obj.email = rec.email
          obj.categories = rec.categories
          res.json(rec)
        }
      })
}

const updateCategoryById = (req, res) => {
  User.findByIdAndUpdate(req.params.user_id,
    { $pull: { categories: {
      category: req.body.old_category,
    }}})
      .exec((err, rec) => {
        if (err) res.send(err)
        else {

          User.findByIdAndUpdate(req.params.user_id,
            { $push: { categories: {
              category: req.body.new_category,
              icon: req.body.new_icon,
              color: req.body.new_color,
            }}}, { new: true })
              .exec((err, rec) => {
                if (err) res.send(err)
                else {
                  let obj = {}
                  obj._id = rec._id
                  obj.email = rec.email
                  obj.categories = rec.categories
                  res.json(rec)
                }
              })

        }
      })
}

const removeCategoryById = (req, res) => {
  // belum divalidasi
  // console.log(req.params.user_id);
  User.findByIdAndUpdate(req.params.user_id,
    { $pull: { categories: {
      category: req.body.category,
    }}}, { new: true })
      .exec((err, rec) => {
        if (err) res.send(err)
        else {
          let obj = {}
          obj._id = rec._id
          obj.email = rec.email
          obj.categories = rec.categories
          res.json(rec)
        }
      })
}

const updateUserById = (req, res) => {
  User.findByIdAndUpdate(req.params.user_id, { $set: req.body }, { new: true })
    .exec((err, rec) => {
      if (err) res.send(err)
      else {
        let obj = {}
        obj._id = rec._id
        obj.email = rec.email
        obj.categories = rec.categories
        res.json(rec)
      }
    })
} // updateUserById

const deleteUserById = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // deleteUserById

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  insertCategoryById,
  updateCategoryById,
  removeCategoryById,
  signUpUser,
  signInUser
}
