const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')

router.post('/', scheduleController.create)
router.get('/teacher/', scheduleController.getForTeacher)
router.get('/student/', scheduleController.getForStudent)
router.get('/', scheduleController.getAll)

module.exports = router