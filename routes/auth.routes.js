const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const saltRounds = 10
// const jwt = require('jsonwebtoken')


const router = require('express').Router()

router.post('/signup', (req, res, next) => {

    const { email, password, name, avatar, role } = req.body

    if (password.length < 3) {
        res.status(400).json({ message: 'La contraseña debe tener al menos 3 caracteres.' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: 'El usuario ya existe.' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ name, email, password: hashedPassword })
        })
        .then((createdUser) => {
            const { _id, name, email, avatar, role } = createdUser
            const user = { _id, name, email, role, avatar }

            res.status(201).json({ user })
        })
        .catch(err => next(err))


})

module.exports = router