const express     = require('express'),
      router      = express.Router(),
      controller  = require('../controllers/user');

router.post("/:user_id", controller.insertCategoryById)

module.exports = router
