const router  = require('express').Router()
const UserCtl = require('../controllers/UserCtl')
const AuthCtl = require('../controllers/AuthCtl')
const ExpenseCtl = require('../controllers/ExpenseCtl')

// router.use('/api', require('./api'))

router.get('/', (req, res) => {
  res.send('123')
})

router.post('/signin', AuthCtl.signin)
router.post('/signup', AuthCtl.signup)

router.get('/users', UserCtl.getAll)
router.get('/users/:id', UserCtl.getById)

router.post('/expenses', ExpenseCtl.insert)
router.get('/expenses/:user_id/total_amount', ExpenseCtl.totalAmountById)
router.get('/expenses', ExpenseCtl.getAll)
router.get('/expenses/:user_id', ExpenseCtl.getAllByUserId)

module.exports = router