const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/user');

router.get("/:user_id", controller.getUserById)
router.put("/:user_id/categories", controller.insertCategoryById)
router.delete("/:user_id/categories", controller.removeCategoryById)
// router.post("/", controller.newIncome)

module.exports = router
