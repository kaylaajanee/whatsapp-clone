const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes"); // Import chatRoutes

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON payloads

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes); // Register chatRoutes

module.exports = app;
