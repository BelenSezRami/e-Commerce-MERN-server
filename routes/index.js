const router = require("express").Router()

router.use("/auth", require('./auth.routes'))
router.use("/user", require('./user.routes'))
router.use("/paintings", require('./painting.routes'))

router.use("/upload", require('./upload.routes'))

module.exports = router