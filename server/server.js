const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = "mongodb+srv://nandkishor:nandkishor@nirmitee.numn1.mongodb.net/";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => console.error("MongoDB connection error:", err));

// Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});

const Event = mongoose.model("Event", eventSchema);

// Routes
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end, allDay } = req.body;

    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end dates are required' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { 
        title, 
        start: new Date(start), 
        end: new Date(end),
        allDay: allDay || false 
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
