const mongoose = require('mongoose'),
      db  = require("./db");

const dreamSchema = mongoose.Schema({
  record_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  dream: {
    type: String,
    required: true,
  },
})

const Dream = db.model("Dream", dreamSchema);

module.exports = Dream