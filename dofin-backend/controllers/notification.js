const Notification = require('../models/notification');

const getNotification = (req, res) => {
  Notification.find({ record_by: req.params.user_id }, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // getNotification

const insertNotification = (req, res) => {
  Notification.create({
    record_by: req.body.record_by,
    notification: req.body.notification,
  }, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // getNotification

module.exports = {
  getNotification,
  insertNotification
}
