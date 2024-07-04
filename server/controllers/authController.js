const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).send({ success: true, user: newUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login request received:", req.body); // Log request body

    const user = await User.findByUsername(req.body.username);
    if (!user) {
      console.log("User not found");
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.user_id }, "your_jwt_secret");
    console.log("Login successful, token generated:", token);
    res.send({ token, user_id: user.user_id });
  } catch (error) {
    console.error("Error during login:", error); // Log error
    res.status(500).send({ message: error.message });
  }
};
