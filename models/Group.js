const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Group = sequelize.define('group', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {
    Group
}