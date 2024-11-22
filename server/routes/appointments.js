const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();

// Get all appointments
router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// Create a new appointment
router.post("/", async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.status(201).json(appointment);
});

// Update appointment
router.put("/:id", async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedAppointment);
});

// Delete appointment
router.delete("/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
