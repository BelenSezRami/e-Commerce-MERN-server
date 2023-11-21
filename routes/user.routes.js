const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

const { getAllUsers, getOneUser, editUser, deleteUser, addPaintingToFavorites, removePaintingFromFavorites } = require('../controllers/user.controllers')

router.get('/getAllUsers', getAllUsers)
router.get('/getOneUser/:user_id', isAuthenticated, getOneUser)
router.put('/editUser/:user_id', isAuthenticated, editUser)
router.delete('/deleteUser/:user_id', isAuthenticated, deleteUser)
router.put('/addPaintingToFavorites/:user_id/:painting_id', /*isAuthenticated,*/ addPaintingToFavorites)
router.put('/removePaintingFromFavorites/:user_id/:painting_id', /*isAuthenticated,*/ removePaintingFromFavorites)

module.exports = router
