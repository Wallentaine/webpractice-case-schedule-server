const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Schedule = sequelize.define('schedule', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dayOfWeek: {type: DataTypes.STRING, allowNull: false},
    subject: {type: DataTypes.STRING, allowNull: false},
    teacher: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {
    Schedule
}