const router = require('express').Router()

const { signup } = require('../controllers/auth.controllers')

router.post('/signup', signup)

module.exports = router