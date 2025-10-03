const routesadmin = require("express").Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const doctorController = require("../apis/doctor/doctorController")
const PatientController = require("../apis/Patient/PatientController")
const userController = require("../apis/user/userController")
const appointmentController= require("../apis/appointment/appointmentController")
const departmentController= require("../apis/department/departmentController")
const enquiryController= require("../apis/enquiry/enquiryController")
const labreportController= require("../apis/labreport/labreportController")
const prescriptionController= require("../apis/prescription/prescriptionController")
const dashboardController=require("../apis/dashboard/dashboardController")
routesadmin.post("/dashboard",dashboardController.dashboard);

routesadmin.post("/user/login",userController.Login)

        routesadmin.use(require("../middleware/admintokenchecker"))

routesadmin.post("/appointment/add",appointmentController.add)
routesadmin.post("/department/add",upload.single("image"),departmentController.add)
routesadmin.post("/enquiry/add",enquiryController.add)
routesadmin.post("/labreport/add",labreportController.add)
routesadmin.post("/prescription/add",prescriptionController.add)

routesadmin.post("/appointment/getall",appointmentController.getall)
routesadmin.post("/department/getall",departmentController.getall)
routesadmin.post("/enquiry/getall",enquiryController.getall)
routesadmin.post("/labreport/getall",labreportController.getall)
routesadmin.post("/prescription/getall",prescriptionController.getall)
routesadmin.post("/doctor/getall",doctorController.getall)
routesadmin.post("/patient/getall",PatientController.getall)

routesadmin.post("/appointment/getSingle",appointmentController.getSingle)
routesadmin.post("/department/getSingle",departmentController.getSingle)
routesadmin.post("/enquiry/getSingle",enquiryController.getSingle)
routesadmin.post("/labreport/getSingle",labreportController.getSingle)
routesadmin.post("/prescription/getSingle",prescriptionController.getSingle)
routesadmin.post("/doctor/getSingle",doctorController.getSingle)
routesadmin.post("/patient/getSingle",PatientController.getSingle)

routesadmin.post("/appointment/deleteOne",appointmentController.deleteOne)
routesadmin.post("/department/deleteOne",departmentController.deleteOne)
routesadmin.post("/enquiry/deleteOne",enquiryController.deleteOne)
routesadmin.post("/labreport/deleteOne",labreportController.deleteOne)
routesadmin.post("/prescription/deleteOne",prescriptionController.deleteOne)
routesadmin.post("/doctor/deleteOne",doctorController.deleteOne)
routesadmin.post("/patient/deleteOne",PatientController.deleteOne)

routesadmin.post("/appointment/changeStatus",appointmentController.changeStatus)
routesadmin.post("/department/changeStatus",departmentController.changeStatus)
routesadmin.post("/enquiry/changeStatus",enquiryController.changeStatus)
routesadmin.post("/labreport/changeStatus",labreportController.changeStatus)
routesadmin.post("/prescription/changeStatus",prescriptionController.changeStatus)
routesadmin.post("/doctor/changeStatus",doctorController.changeStatus)
routesadmin.post("/patient/changeStatus",PatientController.changeStatus)

routesadmin.post("/appointment/update",appointmentController.update)
routesadmin.post("/department/update",upload.single("image"),departmentController.update)
routesadmin.post("/enquiry/update",enquiryController.update)
routesadmin.post("/labreport/update",labreportController.update)
routesadmin.post("/prescription/update",prescriptionController.update)
routesadmin.post("/doctor/update",upload.single("image"),doctorController.update)
routesadmin.post("/doctor/register",upload.single("image"),doctorController.register)
routesadmin.post("/patient/update",upload.single("image"),PatientController.update)





routesadmin.post("/user/changepassword",userController.changepassword)


module.exports = routesadmin 