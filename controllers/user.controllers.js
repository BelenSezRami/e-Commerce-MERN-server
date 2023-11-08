const User = require('../models/User.model')


//ALL USERS LIST
const getAllUsers = (req, res, next) => {

    User
        .find()
        .sort({ name: 1 })
        .then(users => res.json(users))
        .catch(err => next(err))
}


//USER DETAILS
const getOneUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then((user) => res.json(user))
        .catch(err => next(err))
}


//EDIT USER
const editUser = (req, res, next) => {
    const { name, lastName, avatar } = req.body
    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { name, lastName, avatar })
        .then(response => res.json({ editedUser: response.name, response }))
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
            res.status(500).json({ err: 'Error al agregar la pintura a favoritos', details: err.message });
        })
}


// //REMOVE PAINTING FROM FAVOURITE
const removePaintingFromFavorites = (req, res, next) => {
    const { userId, paintingId } = req.params

    User.findByIdAndUpdate(
        userId,
        { $pull: { favoritePaintings: paintingId } },
        { new: true }
    )
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(err => {
            res.status(500).json({ err: 'Error al eliminar la pintura de favoritos', details: err.message })
        })
}

// const removeFavoritePainting = (req, res, next) => {

//     const { painting_id } = req.params
//     const { user_id } = req.body

//     User
//         .findByIdAndUpdate(user_id, { $pull: { favoritePaintings: painting_id } }, { new: true })
//         .then(() => res.sendStatus(204))
//         .catch(err => next(err))
// }

module.exports = {
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
    addPaintingToFavorites,
    removePaintingFromFavorites
}