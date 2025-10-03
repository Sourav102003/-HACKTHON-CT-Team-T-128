const sessionModel = require("../models/sessionModel"); // adjust path if needed

const addSession = (req, res) => {
    var errMsgs = [];

    // Validate required fields
    if (!req.body.classId) errMsgs.push("classId is required!!");
    if (!req.body.subjectId) errMsgs.push("subjectId is required!!");
    if (!req.body.teacherId) errMsgs.push("teacherId is required!!");
    if (!req.body.startTime) errMsgs.push("startTime is required!!");
    if (!req.body.endTime) errMsgs.push("endTime is required!!");

    if (errMsgs.length > 0) {
        return res.send({ status: 422, success: false, message: errMsgs });
    }

    let sessionObj = new sessionModel();
    sessionObj.classId = req.body.classId;
    sessionObj.subjectId = req.body.subjectId;
    sessionObj.teacherId = req.body.teacherId;
    sessionObj.startTime = req.body.startTime;
    sessionObj.endTime = req.body.endTime;
    if (req.body.qrCode) sessionObj.qrCode = req.body.qrCode;
    sessionObj.status = req.body.status || "scheduled";

    sessionObj.save()
        .then((sessionData) => {
            res.send({
                status: 200,
                success: true,
                message: "Session added successfully!!",
                data: sessionData
            });
        })
        .catch((err) => {
            console.error("Error adding session:", err);
            res.send({ status: 500, success: false, message: "Something went wrong!!" });
        });
};

module.exports = { addSession };
