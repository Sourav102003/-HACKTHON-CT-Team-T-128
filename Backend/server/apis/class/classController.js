const classModel = require("../class/classModel");
const mongoose = require("mongoose");

// ➤ Add Class
const add = (req, res) => {
    var errMsgs = [];

    if (!req.body.name) errMsgs.push("name is required!!");
    if (!req.body.section) errMsgs.push("section is required!!");
    if (!req.body.department) errMsgs.push("department is required!!");

    if (errMsgs.length > 0) {
        return res.send({ status: 422, success: false, message: errMsgs });
    }

    let classObj = new classModel();
    classObj.name = req.body.name;
    classObj.section = req.body.section;
    classObj.department = req.body.department;
    if (req.body.teacher && mongoose.Types.ObjectId.isValid(req.body.teacher)) {
        classObj.teacher = req.body.teacher;
    }

    classObj.save()
        .then((classdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Class added successfully!!",
                data: classdata
            });
        })
        .catch(() => {
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};

// ➤ Get All Classes
const getAll = (req, res) => {
    classModel.find(req.body)
        .populate("teacher")
        .then((classdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Data loaded!!",
                data: classdata
            });
        })
        .catch(() => {
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};

// ➤ Get Single Class
const getSingle = (req, res) => {
    var errMsgs = [];
    if (!req.body._id) errMsgs.push("_id is required");

    if (errMsgs.length > 0) {
        return res.send({ status: 422, success: false, message: errMsgs });
    }

    classModel.findOne({ _id: req.body._id })
        .populate("teacher")
        .then((classdata) => {
            if (!classdata) {
                res.send({ status: 404, success: false, message: "Class not found!!" });
            } else {
                res.send({ status: 200, success: true, message: "Data loaded!!", data: classdata });
            }
        })
        .catch(() => {
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};

// ➤ Delete Class
const deleteOne = (req, res) => {
    var errMsgs = [];
    if (!req.body._id) errMsgs.push("_id is required");

    if (errMsgs.length > 0) {
        return res.send({ status: 422, success: false, message: errMsgs });
    }

    classModel.findOne({ _id: req.body._id })
        .then((classdata) => {
            if (!classdata) {
                res.send({ status: 404, success: false, message: "Class not found!!" });
            } else {
                classdata.deleteOne()
                    .then((deletedData) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "Class deleted successfully!!",
                            data: deletedData
                        });
                    })
                    .catch(() => {
                        res.send({ status: 402, success: false, message: "Class not deleted!!" });
                    });
            }
        })
        .catch(() => {
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};

// ➤ Change Status
const changeStatus = (req, res) => {
    var errMsgs = [];
    if (!req.body._id) errMsgs.push("_id is required");

    if (errMsgs.length > 0) {
        return res.send({ status: 422, success: false, message: errMsgs });
    }

    classModel.findOne({ _id: req.body._id })
        .then((classdata) => {
            if (!classdata) {
                res.send({ status: 404, success: false, message: "Class not found!!" });
            } else {
                classdata.status = !classdata.status;
                classdata.save()
                    .then((updatedClass) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "Status changed successfully!!",
                            data: updatedClass
                        });
                    })
                    .catch(() => {
                        res.send({ status: 422, success: false, message: "Status not updated!!" });
                    });
            }
        })
        .catch(() => {
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};

// ➤ Update Class
const update = async (req, res) => {
    try {
        if (!req.body._id) return res.send({ status: 422, success: false, message: ["_id is required"] });

        const classObj = await classModel.findById(req.body._id);
        if (!classObj) return res.send({ status: 404, success: false, message: "Class not found!!" });

        if (req.body.name) classObj.name = req.body.name;
        if (req.body.section) classObj.section = req.body.section;
        if (req.body.department) classObj.department = req.body.department;
        if (req.body.teacher && mongoose.Types.ObjectId.isValid(req.body.teacher)) classObj.teacher = req.body.teacher;

        const updatedClass = await classObj.save();
        res.send({ status: 200, success: true, message: "Class updated!!", data: updatedClass });
    } catch (err) {
        res.send({ status: 500, success: false, message: "Something went wrong!!", error: err.message });
    }
};

module.exports = { add, getAll, getSingle, deleteOne, changeStatus, update };
