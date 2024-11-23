const express = require("express");
const Event = require("../models/Events");

const router = express.Router();

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Event
router.post("/", async (req, res) => {
  const { title, start, end, all_day } = req.body;
  try {
    const event = new Event({ title, start, end, all_day });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Event
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, start, end, all_day } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { title, start, end, all_day },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event updated successfully.", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Event
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
