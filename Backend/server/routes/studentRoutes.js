const studentroutes = require("express").Router()

const userController = require("../apis/user/userController")
const studentController = require("../apis/student/studentController")
const classController = require("../apis/class/classController")
const subjectController = require("../apis/subject/subjectController")
const sessionController = require("../apis/session/sessionController")
const attendanceController = require("../apis/attendence/attendenceController")
const teacherController = require("../apis/teacher/teacherController")
studentroutes.post("/user/login",userController.Login)
studentroutes.post("/student/register",studentController.register)
studentroutes.post("/subject/add",subjectController.add)
studentroutes.post("/subject/getall",subjectController.getall)
studentroutes.post("/subject/getSingle",subjectController.getSingle)
// studentroutes.post("/subject/changeStatus",subjectController.changeStatus)
// studentroutes.post("/subject/update",subjectController.update)

studentroutes.post("/class/add",classController.add)
studentroutes.post("/class/getall",studentController.getall)
studentroutes.post("/class/getSingle",studentController.getSingle)
studentroutes.post("/class/changeStatus",studentController.changeStatus)
studentroutes.post("/class/update",studentController.update)
studentroutes.post("/session/addSession",sessionController.addSession)


// studentroutes.post("/attendence/addAttendance",attendanceController.addAttendance)


    studentroutes.use(require("../middleware/studenttoken"))


studentroutes.post("/student/update",studentController.update)



module.exports = studentroutes 