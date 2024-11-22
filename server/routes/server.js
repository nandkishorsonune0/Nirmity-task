const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://<username>:<password>@cluster.mongodb.net/appointments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
