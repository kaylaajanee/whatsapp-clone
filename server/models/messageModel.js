// server/models/messageModel.js
const pool = require("../db");

class Message {
  static async createMessage(chat_id, sender_id, message_text) {
    try {
      const { rows } = await pool.query("INSERT INTO messages (chat_id, sender_id, message_text) VALUES ($1, (SELECT user_id FROM users WHERE username = $2), $3) RETURNING *", [chat_id, sender_id, message_text]);
      return rows[0];
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  static async getMessagesByChatId(chat_id) {
    try {
      const { rows } = await pool.query("SELECT * FROM messages WHERE chat_id = $1 ORDER BY timestamp ASC", [chat_id]);
      return rows;
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }
}

module.exports = Message;
