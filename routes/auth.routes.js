const router = require('express').Router()

const { signup, login, verify } = require('../controllers/auth.controllers')
const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', verify, isAuthenticated)

module.exports = router