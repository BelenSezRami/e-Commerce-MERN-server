const User = require('../models/User.model')


//ALL USERS LIST
const getAllUsers = (req, res, next) => {

    User
        .find()
        .sort({ name: 1 })
        .then(users => res.json(users))
        .catch(err => next(err))
}


//GET ONE USER
const getOneUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('favoritePaintings')
        .then((user) => res.json(user))
        .catch(err => next(err))
}


//EDIT USER
const editUser = (req, res, next) => {
    const { name, lastName, avatar } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { name, lastName, avatar }, { new: true })
        .then((editedUser) => {
            const { user_id, name, lastName, avatar } = editedUser
            res.status(201).json({ editedUser })
        })
        .catch(err => next(err))
}


//DELETE USER
const deleteUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(user_id => res.json(user_id))
        .catch(err => next(err))
}


//ADD PAINTING TO FAVORITE
const addPaintingToFavorites = (req, res, next) => {

    const { painting_id, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favoritePaintings: painting_id } }, { new: true })
        .then((updatedUser) => {
            console.log('Painting added to favorites', painting_id, user_id)
            res.json(updatedUser)
        })
        .catch(err => {
            res.status(500).json({ err: 'Error al agregar la pintura a favoritos', details: err.message })
        })
}


// //REMOVE PAINTING FROM FAVOURITE
const removePaintingFromFavorites = (req, res, next) => {

    const { user_id, painting_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favoritePaintings: painting_id } }, { new: true })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(err => {
            res.status(500).json({ err: 'Error al eliminar la pintura de favoritos', details: err.message })
        })
}

module.exports = {
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
    addPaintingToFavorites,
    removePaintingFromFavorites
}