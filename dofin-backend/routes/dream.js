const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/dream');

router.get("/:user_id", controller.getDreamsByUserId)
router.post("/", controller.newDream)
router.delete("/:user_id", controller.removeDreamById)

module.exports = router
