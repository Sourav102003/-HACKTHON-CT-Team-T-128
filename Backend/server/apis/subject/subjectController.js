const subjectModel = require("../models/subjectModel");
const mongoose = require("mongoose");

const add = (req, res) => {
    var errMsgs = [];
    console.log(req.body);

    if (!req.body.name) {
        errMsgs.push("name is required!!");
    }
    if (!req.body.classId) {
        errMsgs.push("classId is required!!");
    }

    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }

    let subjectObj = new subjectModel();
    subjectObj.name = req.body.name;
    subjectObj.code = req.body.code || "";
    subjectObj.classId = req.body.classId;

    if (req.body.teacher && mongoose.Types.ObjectId.isValid(req.body.teacher)) {
        subjectObj.teacher = req.body.teacher;
    }

    subjectObj.save()
        .then((subjectdata) => {
            subjectModel.findById(subjectdata._id)
                .select("name code classId teacher status")
                .populate("classId", "name")
                .populate("teacher", "name")
                .then((populatedData) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Subject added successfully!!",
                        data: populatedData
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status: 500,
                success: false,
                message: "Something went wrong!!"
            });
        });
};

module.exports = { add };
