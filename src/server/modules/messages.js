const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  id: String,
  userId: String,
  userName: String,
  message: String,
  createdAt: Date,
  updatedAt: Date,
});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
