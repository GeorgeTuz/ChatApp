const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const MessageSchema = new Schema(
    {
        id: String,
        userId: String,
        userName: String,
        message: String,
        createdAt: Date,
        updatedAt: Date,
        message: String,
    }
);

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;