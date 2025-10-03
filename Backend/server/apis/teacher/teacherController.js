const teacherModel = require("../teacher/teacherModel");
const userModel = require("../user/userModel");
const bcrypt = require("bcrypt");


const register = (req, res) => {
    let errMsgs = [];

    if (!req.body.name) {
        errMsgs.push("name is required!!");
    }
    if (!req.body.email) {
        errMsgs.push("email is required!!");
    }
    if (!req.body.password) {
        errMsgs.push("password is required!!");
    }
    if (!req.body.department) {
        errMsgs.push("department is required!!");
    }
    if (!req.body.specialization) {
        errMsgs.push("specialization is required!!");
    }
    if (!req.body.bio) {
        errMsgs.push("bio is required!!");
    }

    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }

    // Check if user already exists
    userModel.findOne({ email: req.body.email })
        .then((existingUser) => {
            if (existingUser) {
                return res.send({
                    status: 422,
                    success: false,
                    message: "User already exists with same email!!"
                });
            }

            // Create user in users collection
            let userObj = new userModel();
            userObj.name = req.body.name;
            userObj.email = req.body.email;
            userObj.password = bcrypt.hashSync(req.body.password, 10);
            userObj.userType = 2; // assuming 2 = teacher

            userObj.save()
                .then((newUser) => {
                    // Create teacher in teachers collection
                    let teacherObj = new teacherModel();
                    teacherObj.userId = newUser._id;
                    teacherObj.name = req.body.name;
                    teacherObj.email = req.body.email;
                    teacherObj.password = bcrypt.hashSync(req.body.password, 10);
                    teacherObj.department = req.body.department;
                    teacherObj.specialization = req.body.specialization;
                    teacherObj.bio = req.body.bio;

                    teacherObj.save()
                        .then((teacherData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Teacher Registered Successfully!!!",
                                data: teacherData,
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


const getall = (req, res) => {
    teacherModel.find()
        .then((teachers) => {
            res.send({
                status: 200,
                success: true,
                message: "All teachers fetched successfully!!",
                data: teachers
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

// Get single teacher by ID
const getSingle = (req, res) => {
    const teacherId = req.params.id;

    teacherModel.findById(teacherId)
        .then((teacher) => {
            if (!teacher) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Teacher not found!!"
                });
            }
            res.send({
                status: 200,
                success: true,
                message: "Teacher fetched successfully!!",
                data: teacher
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

// Change teacher status (enable/disable)
const getStatus = (req, res) => {
    const teacherId = req.params.id;

    teacherModel.findById(teacherId)
        .then((teacher) => {
            if (!teacher) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Teacher not found!!"
                });
            }

            teacher.status = !teacher.status;
            teacher.save()
                .then((updatedTeacher) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Teacher status updated!!",
                        data: updatedTeacher
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

// Update teacher details
const update= (req, res) => {
    const teacherId = req.params.id;
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) updateData.password = bcrypt.hashSync(req.body.password, 10);
    if (req.body.department) updateData.department = req.body.department;
    if (req.body.specialization) updateData.specialization = req.body.specialization;
    if (req.body.bio) updateData.bio = req.body.bio;

    teacherModel.findByIdAndUpdate(teacherId, updateData, { new: true })
        .then((updatedTeacher) => {
            if (!updatedTeacher) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Teacher not found!!"
                });
            }
            res.send({
                status: 200,
                success: true,
                message: "Teacher updated successfully!!",
                data: updatedTeacher
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


module.exports = { register, getall,getSingle,getStatus,update};
