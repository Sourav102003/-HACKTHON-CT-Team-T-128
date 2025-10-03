const teacherroutes = require("express").Router()

const userController = require("../apis/user/userController")
const studentController = require("../apis/student/studentController")
const teacherController = require("../apis/teacher/teacherController")
teacherroutes.post("/user/login",userController.Login)
teacherroutes.post("/teacher/register",teacherController.register)

    teacherroutes.use(require("../middleware/teachertoken"))

teacherroutes.post("/teacher/update",teacherController.update)
teacherroutes.post("/student/getall",studentController.getall)
teacherroutes.post("/student/getSingle",studentController.getSingle)
teacherroutes.post("/student/changeStatus",studentController.changeStatus)
teacherroutes.post("/student/update",studentController.update)



module.exports = teacherroutes 