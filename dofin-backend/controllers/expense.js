const Expense = require('../models/expense')
const mongoose = require('mongoose')
const Vision = require('@google-cloud/vision');
const vision = Vision({
  project_id: "vision-167301"
});
const fs = require('fs')

const newExpense = (req, res) => {
  Expense.create({
    record_by: req.body.record_by,
    amount: req.body.amount,
    description: req.body.description,
    items: req.body.items,
    category: req.body.category,
    date: req.body.date,
    location: req.body.location,
  }, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // newExpense

const getTotalAmountById = (req, res) => {
  Expense.aggregate(
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
} // getTotalAmountById

const getTotalAmountByMonthById = (req, res) => {
  Expense.aggregate(
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
      }},
      {$group: {
        _id: { year: '$year', month: '$month', category: '$category' },
        total_amount: { $sum: "$amount" },
      }},
      {$group: {
        _id: { year: '$_id.year' },
        months: { $addToSet: { month: "$_id.month", category: "$_id.category", total_amount: "$total_amount" } },
      }},
    ])
      .exec((err, rec) => {
        if (err) res.send(err)
        else res.json(rec)
      })
} // getTotalAmountByMonthById

const getExpensesById = (req, res) => {
  Expense.find({record_by: req.params.user_id}, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // getExpensesById

const getTotalAmountByCategoryThisYearById = (req, res) => {
  const year = new Date().getFullYear()
  Expense.aggregate(
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

const updateById = (req, res) => {
  Expense.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // updateById

const removeExpenseById = (req, res) => {
  Expense.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // removeExpenseById

const newPhoto = (req, res) => {
  var Image = {
    src: `data:${req.body.blob.type};base64,${req.body.blob.data}`
  };
  const data = Image.src;
  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }
  var imageBuffer = decodeBase64Image(data);
  fs.writeFile('photo.jpg', imageBuffer.data , function(err){
    //Finished
    if (err) {
      console.log(err);
    } else {
      var fileName = './photo.jpg'
      vision.readDocument(fileName)
        .then((results) => {
          const fullTextAnnotation = results[1].responses[0].fullTextAnnotation;
          // res.send(fullTextAnnotation.text);
          var data = fullTextAnnotation.text
          var array = data.split('\n')

          // connect price within item
          var array2 = array.map((val, i) => {
            var tempval = ''
            if (i < array.length-1)
              tempval = array[i+1].replace(/(\d+)[\,\.](\d{3})/g, '$1$2')
                          .replace(/(\d+)[\,\.]\s+/g, '$1')
            if (/[1-9]\s?x\s?\d{3,}/i.test(tempval))
              return `${val} ${tempval}`
            return val
          })

          // filter min 3 digit, tidak boleh -000
          var lines = array2.filter(val => /\d{3}/.test(val) && !/\-\d{3}/.test(val))

          var items = lines.filter(val => /^\D/.test(val) && /\d{3,}$/.test(val))
                        .map(val => {
                          var obj = {}
                          obj.item = val.substr(0, val.lastIndexOf(' '))
                          obj.price = +val.substr(val.lastIndexOf(' ') + 1)
                          return obj
                        })

          res.send(items)
          console.log(items);
        })
        .catch((err) => {
          console.error('ERROR:', err);
        });
    }
  });
} // newPhoto

module.exports = {
  newExpense,
  getTotalAmountById,
  getExpensesById,
  getTotalAmountByMonthById,
  getTotalAmountByCategoryThisYearById,
  removeExpenseById,
  newPhoto
}
