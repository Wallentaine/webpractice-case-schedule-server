const {Group} = require('../models/Group')
const ApiError = require('../error/ApiError')

class GroupController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            if (!name) return next(ApiError.badRequest("Не было передано название!"))

            const group = await Group.create({name})

            if (!group) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(group)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const groups = await Group.findAll()

            if (!groups) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(groups)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new GroupController()