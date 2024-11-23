const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  all_day: { type: Boolean, default: false },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

eventSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model("Event", eventSchema);
