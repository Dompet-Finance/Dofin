const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/user');

router.get("/:user_id", controller.getUserById)
router.put("/:user_id/categories", controller.insertCategoryById)
router.patch("/:user_id/categories", controller.updateCategoryById)
router.put("/:user_id/categories/delete", controller.removeCategoryById)
// router.post("/", controller.newIncome)

module.exports = router
