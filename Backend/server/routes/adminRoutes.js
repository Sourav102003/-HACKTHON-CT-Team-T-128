const adminroutes = require("express").Router()

const userController = require("../apis/user/userController")
const studentController = require("../apis/student/studentController")
const teacherController = require("../apis/teacher/teacherController")
adminroutes.post("/user/login",userController.Login)




adminroutes.use(require("../middleware/admintoken"))
adminroutes.post("/teacher/getall",teacherController.getall)
adminroutes.post("/teacher/getSingle",teacherController.getSingle)
adminroutes.post("/teacher/changeStatus",teacherController.changeStatus)
adminroutes.post("/teacher/update",teacherController.update)

adminroutes.post("/student/getall",studentController.getall)
adminroutes.post("/student/getSingle",studentController.getSingle)
adminroutes.post("/student/changeStatus",studentController.changeStatus)
adminroutes.post("/student/update",studentController.update)



module.exports = adminroutes 