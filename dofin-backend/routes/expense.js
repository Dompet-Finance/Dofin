const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/expense');

router.get("/:user_id", controller.getExpensesById)
router.get("/:user_id/total_amount", controller.getTotalAmountById)
router.get("/:user_id/total_amount_by_month", controller.getTotalAmountByMonthById)
router.get("/:user_id/total_amount_by_category", controller.getTotalAmountByCategoryThisYearById)
router.post("/", controller.newExpense)
router.delete("/:id", controller.removeExpenseById)
router.post("/photo", controller.newPhoto)

module.exports = router
