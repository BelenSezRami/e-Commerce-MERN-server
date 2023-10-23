const router = require("express").Router()

router.use("/paintings", require('./painting.routes'))
router.use("/auth", require('./auth.routes'))

module.exports = router
