const mongoose = require("mongoose");
const subjectModel = require("../subject/subjectModel"); // adjust path if needed

const add = (req, res) => {
    var errMsgs = [];

    // Required fields
    if (!req.body.name) errMsgs.push("name is required!!");
    if (!req.body.code) errMsgs.push("code is required!!");

    // Validate classId
    if (!req.body.classId) {
        errMsgs.push("classId is required!!");
    } else if (!mongoose.Types.ObjectId.isValid(req.body.classId)) {
        errMsgs.push("classId is invalid!!");
    }

    // Optional teacher validation
    if (req.body.teacher && !mongoose.Types.ObjectId.isValid(req.body.teacher)) {
        errMsgs.push("teacher ID is invalid!!");
    }

    if (errMsgs.length > 0) {
        return res.send({ status: 422, success: false, message: errMsgs });
    }

    // Create new subject
    let subjectObj = new subjectModel();
    subjectObj.name = req.body.name;
    subjectObj.code = req.body.code;
    subjectObj.classId = req.body.classId;
    if (req.body.teacher) subjectObj.teacher = req.body.teacher;

    subjectObj.save()
        .then((subjectData) => {
            res.send({
                status: 200,
                success: true,
                message: "Subject added successfully!!",
                data: subjectData
            });
        })
        .catch((err) => {
            console.error("Error adding subject:", err);
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};


const getall = (req, res) => {
    subjectModel.find()
        .then((subject) => {
            res.send({
                status: 200,
                success: true,
                message: "All subject fetched successfully!!",
                data: subject
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
        subjectModel.findById(req.body._id)
            .then((subjectData) => {
                if (!subjectData) {
                    return res.send({
                        status: 404,
                        success: false,
                        message: "subject not found!!"
                    });
                } else {
                    return res.send({
                        status: 200,
                        success: true,
                        message: "subject fetched successfully!!",
                        data: subjectData
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



module.exports = { add,getall,getSingle };
