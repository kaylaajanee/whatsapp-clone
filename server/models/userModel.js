const pool = require("../db");

class User {
  static async findByUsername(username) {
    try {
      console.log("Finding user by username:", username); // Log the username being queried
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      console.log("User found:", rows[0]); // Log the result
      return rows[0];
    } catch (error) {
      console.error("Error in findByUsername:", error); // Log any errors
      throw error; // Re-throw the error to be handled by the calling function
    }
  }

  static async create(userData) {
    try {
      const { username, password } = userData;
      const { rows } = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
      return rows[0];
    } catch (error) {
      console.error("Error in create:", error); // Log any errors
      throw error; // Re-throw the error to be handled by the calling function
    }
  }
}

module.exports = User;
