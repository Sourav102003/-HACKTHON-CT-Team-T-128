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
        teacherModel.findById(req.body._id)
            .then((teacherData) => {
                if (!teacherData) {
                    return res.send({
                        status: 404,
                        success: false,
                        message: "teacher not found!!"
                    });
                } else {
                    return res.send({
                        status: 200,
                        success: true,
                        message: "teacher fetched successfully!!",
                        data: teacherData
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

// Change teacher status (enable/disable)
const changeStatus = async (req, res) => {
  try {
    if (!req.body._id) {
      return res.status(422).send({
        success: false,
        message: "_id is required",
      });
    }

    // 1. Find teacher by ID
    const teacher = await teacherModel.findById(req.body._id);
    if (!teacher) {
      return res.status(404).send({
        success: false,
        message: "Patient not found!!",
      });
    }

    // 2. Toggle teacher status
    teacher.status = !teacher.status;
    await teacher.save();

    // 3. Update linked user status (assuming teacher.userId exists)
    const user = await userModel.findById(teacher.userId);
    if (user) {
      user.status = teacher.status; // keep same as teacher
      await user.save();
    }

    return res.status(200).send({
      success: true,
      message: "Status updated successfully!!",
      data: { teacher, user },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong!!",
      error: err.message,
    });
  }
};

// Update teacher details
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
    if (req.body.department) updateData.department = req.body.department;
    if (req.body.specialization) updateData.specialization = req.body.specialization;
    if (req.body.bio) updateData.bio = req.body.bio;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    // Update teacher
    const updatedTeacher = await teacherModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true } // return updated document
    );

    if (!updatedTeacher) {
      return res.status(404).send({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating teacher",
      error: error.message,
    });
  }
};


module.exports = { register, getall,getSingle,changeStatus,update};
