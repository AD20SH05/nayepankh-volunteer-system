const mongoose = require("mongoose");
const volunteerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  city: String,
  skills: String,
  password: String,
  role: { type: String, default: "volunteer" },
  status: { type: String, default: "Pending" }
});
module.exports = mongoose.model("Volunteer", volunteerSchema);