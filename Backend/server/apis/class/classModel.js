const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  section: { type: String, default: "" },        
  department: { type: String, default: "" },       
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" }, 
  status: { type: Boolean, default: true },        
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("classes", classSchema);
