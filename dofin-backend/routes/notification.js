const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/user');

router.get("/", controller.getNotification)
router.post("/:user_id", controller.insertNotification)

module.exports = router
