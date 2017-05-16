const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/notification');

router.get("/:user_id", controller.getNotification)
router.post("/:user_id", controller.insertNotification)

module.exports = router
