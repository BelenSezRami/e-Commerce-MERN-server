const Painting = require('../models/Painting.model')

//ALL PAINTINGS LIST
const getAllPaintings = (req, res, next) => {

    Painting
        .find()
        .select({ title: 1, image: 1 })
        .sort({ year: 1, title: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}


//GET ONE PAINTING BY ID
const getOnePainting = (req, res, next) => {

    const { painting_id } = req.params

    Painting
        .findById(painting_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}


//CREATE ONE PAINTING
const savePainting = (req, res, next) => {

    const { title, image, height, width, techniques, description, year, price, sold } = req.body

    Painting
        .create({ title, image, height, width, techniques, description, year, price, sold })
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    getAllPaintings,
    getOnePainting,
    savePainting
}