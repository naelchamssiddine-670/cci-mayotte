const mongoose = require("mongoose");

const historiqueSchema = new mongoose.Schema({
  action: String,
  details: String,
  date: { type: Date, default: Date.now }
}, {
  collection: "historique"
});

module.exports = mongoose.model("Historique", historiqueSchema);