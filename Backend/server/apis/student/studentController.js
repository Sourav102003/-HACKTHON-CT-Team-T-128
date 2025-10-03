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
    var errMsgs = [];
    if (!req.body._id) {
        errMsgs.push("id is required");
    }

    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    } else {
        studentModel.findById(req.body._id)
            .then((studentData) => {
                if (!studentData) {
                    return res.send({
                        status: 404,
                        success: false,
                        message: "Student not found!!"
                    });
                } else {
                    return res.send({
                        status: 200,
                        success: true,
                        message: "Student fetched successfully!!",
                        data: studentData
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong!!"
                });
            });
    }
};


// Change student status
const changeStatus = async (req, res) => {
  try {
    if (!req.body._id) {
      return res.status(422).send({
        success: false,
        message: "_id is required",
      });
    }

    // 1. Find student by ID
    const student = await studentModel.findById(req.body._id);
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Patient not found!!",
      });
    }

    // 2. Toggle student status
    student.status = !student.status;
    await student.save();

    // 3. Update linked user status (assuming student.userId exists)
    const user = await userModel.findById(student.userId);
    if (user) {
      user.status = student.status; // keep same as student
      await user.save();
    }

    return res.status(200).send({
      success: true,
      message: "Status updated successfully!!",
      data: { student, user },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong!!",
      error: err.message,
    });
  }
};

// Update student details
const update = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(422).send({
        success: false,
        message: "_id is required",
      });
    }

    // Prepare update object
    let updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.rollNo) updateData.rollNo = req.body.rollNo;
    if (req.body.department) updateData.department = req.body.department;
    if (req.body.year) updateData.year = req.body.year;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    // Update student
    const updatedStudent = await studentModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true } // return updated document
    );

    if (!updatedStudent) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating student",
      error: error.message,
    });
  }
};

module.exports = {  register,getall,getSingle,changeStatus,update};
