const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/dream');

router.get("/", controller.getDream)
router.post("/", controller.newDream)

module.exports = router
