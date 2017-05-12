const mongoose = require('mongoose'),
      db  = require("./db");

const incomeSchema = mongoose.Schema({
  nominal: Number,
  category: String
})

const Income = db.model("Income", incomeSchema);

module.exports = Income
