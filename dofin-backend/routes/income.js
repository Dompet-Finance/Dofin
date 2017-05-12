const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/income');

router.get("/", controller.getIncome)
router.post("/", controller.newIncome)

module.exports = router
