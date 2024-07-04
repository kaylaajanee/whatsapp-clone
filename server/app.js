const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON payloads

app.use("/api/auth", authRoutes);

module.exports = app;
