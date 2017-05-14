const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/income');

router.get("/:user_id", controller.getIncomeById)
router.get("/:user_id/total_amount", controller.getTotalAmountByUserId)
router.get("/:user_id/total_amount_by_month", controller.getTotalAmountByMonthById)
router.get("/:user_id/total_amount_by_category", controller.getTotalAmountByCategoryThisYearById)
router.post("/", controller.newIncome)
router.delete("/:id", controller.removeIncomeById)

module.exports = router
