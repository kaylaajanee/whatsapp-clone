// server/models/chatModel.js
const pool = require("../db");

class Chat {
  static async createChat(username, room) {
    try {
      const { rows } = await pool.query("INSERT INTO chats (user1_id, user2_id) VALUES ((SELECT user_id FROM users WHERE username = $1), $2) RETURNING *", [username, room]);
      return rows[0];
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  static async findChatByUsers(username, room) {
    try {
      const { rows } = await pool.query("SELECT * FROM chats WHERE user1_id = (SELECT user_id FROM users WHERE username = $1) AND user2_id = $2", [username, room]);
      return rows[0];
    } catch (error) {
      console.error("Error finding chat:", error);
      throw error;
    }
  }
}

module.exports = Chat;
