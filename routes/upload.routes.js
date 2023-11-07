const router = require("express").Router()
const uploaderMiddleware = require("../middlewares/uploader.middleware")
const { uploadImage } = require('../controllers/upload.controllers')

router.post('/image', uploaderMiddleware.single('image'), uploadImage)

module.exports = router