const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/expense');

router.get("/:user_id", controller.getExpensesById)
router.get("/:user_id/total_amount", controller.getTotalAmountById)
router.post("/", controller.newExpense)
router.delete("/:id", controller.removeExpenseById)

module.exports = router
