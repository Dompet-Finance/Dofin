const router  = require('express').Router()
const UserCtl = require('../controllers/user')
const AuthCtl = require('../controllers/auth')
const ExpenseCtl = require('../controllers/expense')

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