const Painting = require('../models/Painting.model')
const User = require('../models/User.model')

//ALL PAINTINGS LIST
const getAllPaintings = (req, res, next) => {

    Painting
        .find()
        .select({ title: 1, image: 1 })
        .sort({ year: 1, title: 1 })
        .then(foundPaintings => res.json(foundPaintings))
        .catch(err => next(err))
}


//GET ONE PAINTING BY ID
const getOnePainting = (req, res, next) => {

    const { painting_id } = req.params

    Painting
        .findById(painting_id)
        .then(foundPainting => res.json(foundPainting))
        .catch(err => next(err))
}


//CREATE ONE PAINTING
const createPainting = (req, res, next) => {

    const { title, image, height, width, techniques, description, year, price, sold } = req.body

    Painting
        .create({ title, image, height, width, techniques, description, year, price, sold })
        .then(response => res.json(response))
        .catch(err => next(err))
}


//EDIT PAINTING
const editPainting = (req, res, next) => {

    const { painting_id } = req.params
    const { title, image, height, width, techniques, description, year, price, sold } = req.body

    Painting
        .findByIdAndUpdate(painting_id, { title, image, height, width, techniques, description, year, price, sold }, { new: true })
        .then(updatedPainting => res.json(updatedPainting))
        .catch(err => next(err))

}


// // ADD PAINTING TO FAVOURITE
// const addPaintingToFavorite = (req, res, next) => {

//     const { painting_id } = req.params
//     const { user_id } = req.body

//     User
//         .findByIdAndUpdate(user_id, { $addToSet: { favoritePaintings: painting_id } }, { new: true })
//         .then(() => {
//             console.log('Painting added to favorites', painting_id, user_id)
//             res.sendStatus(204)
//         })
//         .catch(err => next(err))
// }


// //REMOVE PAINTING FROM FAVOURITE
// const removeFavoritePainting = (req, res, next) => {

//     const { painting_id } = req.params
//     const { user_id } = req.body

//     User
//         .findByIdAndUpdate(user_id, { $pull: { favoritePaintings: painting_id } }, { new: true })
//         .then(() => res.sendStatus(204))
//         .catch(err => next(err))
// }


//DELETE PAINTING
const deletePainting = (req, res, next) => {

    const { painting_id } = req.params

    Painting
        .findByIdAndDelete(painting_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}


module.exports = {
    getAllPaintings,
    getOnePainting,
    createPainting,
    editPainting,
    // addPaintingToFavorite,
    // removeFavoritePainting,
    deletePainting
}