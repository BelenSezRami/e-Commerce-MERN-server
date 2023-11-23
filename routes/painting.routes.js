const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

const { getAllPaintings, getOnePainting, createPainting, editPainting, deletePainting } = require('../controllers/paintings.controller')


router.get('/getAllPaintings', getAllPaintings)
router.get('/getOnePainting/:painting_id', /*isAuthenticated,*/ getOnePainting)
router.post('/createPainting', /*isAuthenticated,*/ createPainting)
router.put('/editPainting/:painting_id',/*isAuthenticated,*/ editPainting)
router.delete('/deletePainting/:painting_id',/*isAuthenticated,*/ deletePainting)

module.exports = router