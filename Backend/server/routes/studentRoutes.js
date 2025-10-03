const routes = require("express").Router()

const userController = require("../apis/user/userController")
const studentController = require("../apis/student/studentController")
const teacherController = require("../apis/teacher/teacherController")
routes.post("/user/login",userController.Login)
routes.post("/student/register",studentController.register)
routes.post("/teacher/register",teacherController.register)
routes.post("/teacher/getall",teacherController.getall)
routes.post("/teacher/getSingle",teacherController.getSingle)
routes.post("/teacher/changeStatus",teacherController.changeStatus)
routes.post("/teacher/update",teacherController.update)

routes.post("/student/getall",studentController.getall)
routes.post("/student/getSingle",studentController.getSingle)
routes.post("/student/changeStatus",studentController.changeStatus)
routes.post("/student/update",studentController.update)



module.exports = routes 