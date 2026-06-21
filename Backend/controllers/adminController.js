import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "email role").sort({ email: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Transaction.deleteMany({ userId: user._id });
    await user.deleteOne();

    res.json({ message: "User and related transactions deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
