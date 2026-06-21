import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
};
