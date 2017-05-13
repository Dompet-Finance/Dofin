const mongoose = require('mongoose'),
      db  = require("./db");

const dreamSchema = mongoose.Schema({
  dream: String,
})

const Dream = db.model("Dream", dreamSchema);

module.exports = Dream
