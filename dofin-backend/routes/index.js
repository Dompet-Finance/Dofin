const router  = require('express').Router()
const UserCtl = require('../controllers/user')
const AuthCtl = require('../controllers/auth')

// router.use('/api', require('./api'))

router.get('/', (req, res) => {
  res.send('123')
})

router.post('/signin', AuthCtl.signin)
router.post('/signup', AuthCtl.signup)

module.exports = router