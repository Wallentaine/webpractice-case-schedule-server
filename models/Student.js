const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Student = sequelize.define('student', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {
    Student
}