const router = require('express').Router()

const Painting = require('./../models/Painting.model')



router.get('/getAllPaintings', (req, res, next) => {

  Painting
    .find()
    .then(response => res.json(response))
    .catch(err => next(err))
})



router.get('/getOnePainting/:painting_id', (req, res, next) => {

  const { painting_id } = req.params

  Painting
    .findById(painting_id)
    .then(response => res.json(response))
    .catch(err => next.json(err))
})



router.post('/savePainting', (req, res, next) => {

  const { title, image, height, width, technique, description, year, price, sold } = req.body
  Painting
    .create({ title, image, height, width, technique, description, year, price, sold })
    .then(response => res.json(response))
    .catch(err => next(err))
})


module.exports = router
