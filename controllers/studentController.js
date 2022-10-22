const {Student} = require('../models/Student')
const ApiError = require('../error/ApiError')

class StudentController {
    async create(req, res, next) {
        try {
            const {id, fullName, groupId} = req.body

            if (!id || !fullName || !groupId) return next(ApiError.badRequest("Не были переданы необходимые параметры"))

            const student = await Student.create({id, fullName, groupId})

            if (!student) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(student)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getStudentGroup(req, res, next) {
        try {
            const {id} = req.query

            if (!id) return next(ApiError.badRequest("Не был передан Id"))

            const student = await Student.findOne({where: {id}})

            if (!student) return next(ApiError.badRequest("Нету студента с таким id"))

            return res.json(student.groupId)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new StudentController()