// server/controllers/chatController.js
const moment = require("moment");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = (io) => {
  const botName = "ChatCord Bot";

  io.on("connection", (socket) => {
    socket.on("joinRoom", async ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);

      // Welcome current user
      socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

      // Broadcast when a user connects
      socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the chat`));

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });

      // Ensure the chat room is created or fetched
      let chat = await Chat.findChatByUsers(user.username, user.room);
      if (!chat) {
        chat = await Chat.createChat(user.username, user.room);
      }
      const messages = await Message.getMessagesByChatId(chat.chat_id);
      socket.emit("chatHistory", messages);
    });

    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
      const user = getCurrentUser(socket.id);
      const chat = await Chat.findChatByUsers(user.username, user.room);
      const message = await Message.createMessage(chat.chat_id, user.username, msg);
      io.to(user.room).emit("message", formatMessage(user.username, message.message_text));
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};
