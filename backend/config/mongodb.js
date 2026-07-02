const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("⚠️ MongoDB non disponible :", error.message);
    // On ne stoppe plus le serveur si MongoDB échoue
  }
};

module.exports = connectMongo;