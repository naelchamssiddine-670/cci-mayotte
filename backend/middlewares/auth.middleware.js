const verifyToken = (req, res, next) => {
  const adminHeader = req.headers["admin"];

  if (!adminHeader || adminHeader !== "connected") {
    return res.status(401).json({ message: "Accès refusé" });
  }

  next();
};

module.exports = verifyToken;