const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true }, // Which class
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subjects", required: true }, // Which subject
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teachers", required: true }, // Conducted by teacher

  topic: { type: String, default: "" }, // Optional: topic of lecture
  startTime: { type: Date, required: true }, // Lecture start time
  endTime: { type: Date, required: true },   // Lecture end time

  qrCode: { type: String, default: "" }, // QR code/token for attendance
  status: { 
    type: String, 
    enum: ["scheduled", "ongoing", "completed", "cancelled"], 
    default: "scheduled" 
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("sessions", sessionSchema);
