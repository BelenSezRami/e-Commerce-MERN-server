const router = require("express").Router()
const User = require('../models/User.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10


//SIGN UP
const signup = (req, res, next) => {

    const { email, password, name, lastName, avatar, favoritePaintings } = req.body

    if (password.length < 3) {
        res.sendStatus(400)
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.sendStatus(400)
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ name, lastName, email, password: hashedPassword, avatar, favoritePaintings })
        })
        .then((createdUser) => {
            const { _id, name, lastName, email, avatar, role, favoritePaintings } = createdUser
            const user = { _id, name, lastName, email, avatar, role, favoritePaintings }

            res.status(201).json({ user })
        })
        .catch(err => next(err))
}


//LOGIN
const login = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.sendStatus(400)
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.sendStatus(401)
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, name, lastName, avatar, role, favoritePaintings } = foundUser

                const payload = { _id, email, name, lastName, avatar, role, favoritePaintings }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '2h' }
                )

                res.json({ authToken: authToken })
            }

            else {
                res.sendStatus(401)
            }
        })
        .catch(err => next(err))
}

//VERIFY
const verify = (req, res, next) => {
    console.log('EL USUARIO TIENE UN TOKEN CORRECTO Y SUS DATOS SON', req.payload)

    res.status(200).json(req.payload)

}




module.exports = {
    signup,
    login,
    verify
}