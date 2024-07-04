const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const app = require("./app"); // Import the configured Express app

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your React app
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const chatController = require("./controllers/chatController"); // Import chatController
chatController(io); // Initialize chatController with socket.io instance

// Serve the React app
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

server.listen(5000, () => console.log("Server running on port 5000"));
