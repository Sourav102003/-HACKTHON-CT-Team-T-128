const studentModel = require("../student/studentModel");
const userModel = require("../user/userModel");
const bcrypt = require("bcrypt");

const register = (req, res) => {
    let errMsgs = [];

    if (!req.body.name) errMsgs.push("name is required!!");
    if (!req.body.email) errMsgs.push("email is required!!");
    if (!req.body.password) errMsgs.push("password is required!!");
    if (!req.body.rollNo) errMsgs.push("rollNo is required!!");
    if (!req.body.department) errMsgs.push("department is required!!");
    if (!req.body.year) errMsgs.push("year is required!!");

    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }

    userModel.findOne({ email: req.body.email })
        .then((existingUser) => {
            if (existingUser) {
                return res.send({
                    status: 422,
                    success: false,
                    message: "User already exists with same email!!"
                });
            }

            let userObj = new userModel();
            userObj.name = req.body.name;
            userObj.email = req.body.email;
            userObj.password = bcrypt.hashSync(req.body.password, 10);
            userObj.userType = 3; // assuming 3 = student

            userObj.save()
                .then((newUser) => {
                    let studentObj = new studentModel();
                    studentObj.userId = newUser._id;
                    studentObj.name = req.body.name;
                    studentObj.email = req.body.email;
                    studentObj.password = bcrypt.hashSync(req.body.password, 10);
                    studentObj.rollNo = req.body.rollNo;
                    studentObj.department = req.body.department;
                    studentObj.year = req.body.year;

                    studentObj.save()
                        .then((studentData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Student Registered Successfully!!!",
                                data: studentData,
                                userdata: newUser
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.send({
                                status: 500,
                                success: false,
                                message: "Internal server error!!"
                            });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.send({
                        status: 500,
                        success: false,
                        message: "Internal server error!!"
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Internal server error!!"
            });
        });
};

// Get all students
const getall = (req, res) => {
    studentModel.find()
        .then((students) => {
            res.send({
                status: 200,
                success: true,
                message: "All students fetched successfully!!",
                data: students
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Internal server error!!"
            });
        });
};

// Get single student by ID
const getSingle = (req, res) => {
    const studentId = req.params.id;

    studentModel.findById(studentId)
        .then((student) => {
            if (!student) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Student not found!!"
                });
            }
            res.send({
                status: 200,
                success: true,
                message: "Student fetched successfully!!",
                data: student
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Internal server error!!"
            });
        });
};

// Change student status
const changeStatus = (req, res) => {
    const studentId = req.params.id;

    studentModel.findById(studentId)
        .then((student) => {
            if (!student) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Student not found!!"
                });
            }

            student.status = !student.status;
            student.save()
                .then((updatedStudent) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Student status updated!!",
                        data: updatedStudent
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.send({
                        status: 500,
                        success: false,
                        message: "Internal server error!!"
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Internal server error!!"
            });
        });
};

// Update student details
const update = (req, res) => {
    const studentId = req.params.id;
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) updateData.password = bcrypt.hashSync(req.body.password, 10);
    if (req.body.rollNo) updateData.rollNo = req.body.rollNo;
    if (req.body.department) updateData.department = req.body.department;
    if (req.body.year) updateData.year = req.body.year;

    studentModel.findByIdAndUpdate(studentId, updateData, { new: true })
        .then((updatedStudent) => {
            if (!updatedStudent) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Student not found!!"
                });
            }
            res.send({
                status: 200,
                success: true,
                message: "Student updated successfully!!",
                data: updatedStudent
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Internal server error!!"
            });
        });
};

module.exports = {  register,getall,getSingle,changeStatus,update};
