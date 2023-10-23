const router = require('express').Router()

const { getAllPaintings, getOnePainting, savePainting } = require('../controllers/paintings.controller')


router.get('/getAllPaintings', getAllPaintings)
router.get('/getOnePainting/:painting_id', getOnePainting)
router.post('/savePainting', savePainting)

module.exports = router