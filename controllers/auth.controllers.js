const User = require('../models/User.model')

const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require('jsonwebtoken')


//SIGN UP
const signup = (req, res, next) => {

    const { email, password, name, lastName, avatar, role } = req.body

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

            return User.create({ name, lastName, email, password: hashedPassword })
        })
        .then((createdUser) => {
            const { _id, name, lastName, email, avatar, role } = createdUser
            const user = { _id, name, lastName, email, avatar, role }

            res.status(201).json({ user })
        })
        .catch(err => next(err))
}


//LOGIN
const login = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.json({ message: 'Introduce un email válido y/o una contraseña válida.' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: 'Usuario no encontrado.' })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, name, lastName, role } = foundUser

                const payload = { _id, email, name, lastName, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '2h' }
                )

                res.json({ authToken: authToken })
            }

            else {
                res.status(401).json({ message: 'No se ha podido autenticar el usuario' })
            }
        })
        .catch(err => next(err))
}

//VERIFY
const verify = (req, res) => {

    res.status(200).json(req.payload)

}




module.exports = {
    signup,
    login,
    verify
}