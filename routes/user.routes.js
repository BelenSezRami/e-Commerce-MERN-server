const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

const { getAllUsers, getOneUser, editUser, deleteUser, addPaintingToFavorite, } = require('../controllers/user.controllers')

router.get('/getAllUsers', getAllUsers)
router.get('/getOneUser/:user_id', isAuthenticated, getOneUser)
router.put('/editUser/:user_id', isAuthenticated, editUser)
router.delete('/deleteUser/:user_id', isAuthenticated, deleteUser)
router.post('/addPaintingToFavorite/:painting_id', /*isAuthenticated,*/ addPaintingToFavorite)
// router.put('/removePaintingFromFavorite/:painting_id', isAuthenticated, removeFavoritePainting)

module.exports = router
