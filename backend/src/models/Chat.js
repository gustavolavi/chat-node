const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", ChatSchema);