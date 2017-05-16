const mongoose = require('mongoose'),
      db  = require("./db");

const notificationSchema = mongoose.Schema({
  record_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notification: {
    type: String,
  }
})

const Notification = db.model("Notification", notificationSchema);

module.exports = Notification
