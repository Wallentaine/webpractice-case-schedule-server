const {Schedule} = require('../models/Schedule')
const ApiError = require('../error/ApiError')
const {Group} = require("../models/Group")
const XLSX = require("xlsx")
const uuid = require("uuid")
const path = require('path')

const xlsToJSON = async (xlsFile) => {
    let fileName = uuid.v4() + ".xlsx"

    await xlsFile.mv(path.resolve(__dirname, 'static', fileName))

    let workbook = XLSX.readFile(path.resolve(__dirname, 'static', fileName))

    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    return XLSX.utils.sheet_to_json(worksheet, {header:0})
}

class ScheduleController {
    async create(req, res, next) {
        try {
            const {xlsFile} = req.files

            let jsonData = await xlsToJSON(xlsFile)

            jsonData = jsonData.filter((item) => {
                return !!(item['День недели'] && item['Время'] && item['Предмет'] && item['Преподаватель'] && item['Группа'])
            })

            jsonData.map( async (item) => {

                const group = await Group.findOne({where: {name: item['Группа']}})

                await Schedule.create({
                    dayOfWeek: item['День недели'],
                    subject: item['Предмет'],
                    teacher: item['Преподаватель'],
                    time: item['Время'],
                    groupId: group.id
                })
            })

            return res.json({message: "OK"})
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getForTeacher(req, res, next) {
        try {
            const {fullName} = req.query

            if (!fullName) return next(ApiError.badRequest("Не были переданы необходимые данные!"))

            const schedules = await Schedule.findAll({
                where: {teacher: fullName},
                include: [{
                    model: Group,
                    required: true
                }]
            })

            if (!schedules) return next(ApiError.notFound("Расписание отсутствует у данного преподавателя!"))

            return res.json(schedules)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getForStudent(req, res, next) {
        try {
            const {groupId} = req.query

            if (!groupId) return next(ApiError.badRequest("Не были переданы необходимые параметры!"))

            const schedules = await Schedule.findAll({
                where: {groupId},
                include: [{
                    model: Group,
                    required: true
                }]
            })

            if (!schedules) return next(ApiError.notFound("Расписание отсутствует у данного студента!"))

            return res.json(schedules)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const schedules = Schedule.findAll({
                include: [{
                    model: Group,
                    required: true
                }]
            })

            if (!schedules) return next(ApiError.notFound("рассписание отсутствует!"))

            return res.json(schedules)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ScheduleController()