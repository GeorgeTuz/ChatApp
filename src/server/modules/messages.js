const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const MessageSchema = new Schema(
    {
        id: String,
        user_id: String,
        // user_id: { 
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: 'User'
        // },
        message: String,
        created_at: Date,
        updated_at: Date,
        message: String 
    }
);

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;