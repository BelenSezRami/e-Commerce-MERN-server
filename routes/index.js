const router = require("express").Router()

router.use("/paintings", require('./painting.routes'))

module.exports = router
