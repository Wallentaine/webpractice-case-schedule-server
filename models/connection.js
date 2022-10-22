const {Group} = require('./Group')
const {Schedule} = require('./Schedule')
const {Student} = require('./Student')

Group.hasMany(Student)
Student.belongsTo(Group)

Group.hasMany(Schedule)
Schedule.belongsTo(Group)

module.exports = {
    Group,
    Schedule,
    Student,
}