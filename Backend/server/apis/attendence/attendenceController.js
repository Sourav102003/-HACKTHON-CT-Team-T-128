// const mongoose = require("mongoose");
// const attendanceModel = require("../models/attendanceModel"); // adjust path if needed

// const addAttendance = (req, res) => {
//     var errMsgs = [];

//     // Validate required fields
//     if (!req.body.sessionId) {
//         errMsgs.push("sessionId is required!!");
//     } else if (!mongoose.Types.ObjectId.isValid(req.body.sessionId)) {
//         errMsgs.push("sessionId is invalid!!");
//     }

//     if (!req.body.classId) {
//         errMsgs.push("classId is required!!");
//     } else if (!mongoose.Types.ObjectId.isValid(req.body.classId)) {
//         errMsgs.push("classId is invalid!!");
//     }

//     if (!req.body.studentId) {
//         errMsgs.push("studentId is required!!");
//     } else if (!mongoose.Types.ObjectId.isValid(req.body.studentId)) {
//         errMsgs.push("studentId is invalid!!");
//     }

//     // Validate status
//     if (req.body.status && !["present", "absent"].includes(req.body.status)) {
//         errMsgs.push("status must be either 'present' or 'absent'!!");
//     }

//     if (errMsgs.length > 0) {
//         return res.send({ status: 422, success: false, message: errMsgs });
//     }

//     let attendanceObj = new attendanceModel();
//     attendanceObj.sessionId = req.body.sessionId;
//     attendanceObj.classId = req.body.classId;
//     attendanceObj.studentId = req.body.studentId;
//     attendanceObj.status = req.body.status || "absent";
//     if (req.body.meta) attendanceObj.meta = req.body.meta;

//     attendanceObj.save()
//         .then((attendanceData) => {
//             res.send({
//                 status: 200,
//                 success: true,
//                 message: "Attendance added successfully!!",
//                 data: attendanceData
//             });
//         })
//         .catch((err) => {
//             console.error("Error adding attendance:", err);
//             // handle duplicate attendance error
//             if (err.code === 11000) {
//                 return res.send({
//                     status: 409,
//                     success: false,
//                     message: "Attendance already marked for this student in this session!!"
//                 });
//             }
//             res.send({ status: 500, success: false, message: "Something went wrong!!" });
//         });
// };

// module.exports = { addAttendance };
