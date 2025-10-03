const studentroutes = require("express").Router()

const userController = require("../apis/user/userController")
const studentController = require("../apis/student/studentController")
const teacherController = require("../apis/teacher/teacherController")
studentroutes.post("/user/login",userController.Login)
studentroutes.post("/student/register",studentController.register)


    studentroutes.use(require("../middleware/studenttoken"))


studentroutes.post("/student/update",studentController.update)



module.exports = studentroutes 