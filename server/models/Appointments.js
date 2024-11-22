const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  doctor: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
    