const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "sessions", required: true }, // lecture/session
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true },   // class for session
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "students", required: true },// student marking attendance
  status: { 
    type: String, 
    enum: ["present", "absent"], 
    default: "absent" 
  }, // attendance status
  markedAt: { type: Date, default: Date.now }, // when attendance was marked
  meta: { type: Object, default: {} } // extra info (ip, device, location etc.)
});

// prevent duplicate attendance for same student + session
attendanceSchema.index({ sessionId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model("attendances", attendanceSchema);
