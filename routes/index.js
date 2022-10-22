const Router = require('express')
const router = new Router()

const studentRouter = require('./studentRouter')
const groupRouter = require('./groupRouter')
const scheduleRouter = require('./scheduleRouter')

router.use('/student', studentRouter)
router.use('/group', groupRouter)
router.use('/schedule', scheduleRouter)

module.exports = router