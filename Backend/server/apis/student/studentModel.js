const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    rollNo: { type: String, default: "" },
    department: { type: String, default: "" },
    year: { type: Number, default: 1 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = new mongoose.model("students", studentSchema);
