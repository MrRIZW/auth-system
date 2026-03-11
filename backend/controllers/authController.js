const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
 try {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
   return res.json({ message: "All fields required" });
  }

  const existing = await User.findOne({ email });

  if (existing) {
   return res.json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
   name,
   email,
   password: hashed
  });

  res.json({
   message: "User Registered",
   user
  });

 } catch (err) {
  res.json({ error: err.message });
 }
};

const login = async (req, res) => {
 res.json({ message: "Login API working" });
};

module.exports = {
 register,
 login
};