const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/income');

router.get("/:user_id", controller.getIncomeById)
router.get("/:user_id/total_amount", controller.getTotalAmountById)
router.post("/", controller.newIncome)

module.exports = router
