const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/income');

router.get("/:user_id", controller.getIncomeById)
router.get("/:user_id/total_amount", controller.getTotalAmountByUserId)
router.post("/", controller.newIncome)
router.delete("/:id", controller.removeIncomeById)

module.exports = router
