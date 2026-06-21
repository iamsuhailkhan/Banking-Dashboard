import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password, adminSecret } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = adminSecret === process.env.ADMIN_SECRET ? "admin" : "user";
    const user = await User.create({ email, password: hashedPassword, role });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Signup successful",
      token,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token, role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
