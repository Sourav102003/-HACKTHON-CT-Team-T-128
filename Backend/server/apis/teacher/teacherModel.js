const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    department: { type: String, default: "" },
    specialization: { type: String, default: "" },
    bio: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model("teachers", teacherSchema);
