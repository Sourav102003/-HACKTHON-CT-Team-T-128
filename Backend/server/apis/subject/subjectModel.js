const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },             // e.g. "Mathematics"
  code: { type: String, default: "" },                // e.g. "MATH101"
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true }, // subject belongs to a class
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" }, // teacher assigned to subject
  status: { type: Boolean, default: true },           // active/inactive
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("subjects", subjectSchema);
