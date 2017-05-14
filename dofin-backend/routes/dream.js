const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/dream');

router.get("/:user_id", controller.getDreamsByUserId)
router.put("/:user_id", controller.updateDreamsByUserId)
router.post("/", controller.newDream)
router.delete("/:id", controller.removeDreamById)

module.exports = router
